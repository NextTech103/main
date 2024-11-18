'use client';

import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import Link from "next/link";
import customFetch from "@/fetch-wrapper";
import { useLoading } from '../../../../layout/context/LoadingContext';

const ProductsPage = () => {
    const toast = useRef<Toast>(null);
    const [loading,setLoading] = useState(false)
    const [products,setProducts] = useState([])
    const [categoryList,setCategoryList] = useState([]);
    const [productname,setProductName] = useState('')
    const [category,setCategory] = useState('')
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const [activeId,setActiveId] = useState(0)
    const [update,setUpdate] = useState(0)
    const { showLoader, hideLoader } = useLoading();

    useEffect(() => {
        showLoader()
        fetch(`${process.env.NEXT_PUBLIC_API_URL}products`, {
            method: "GET",
            headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
            },
        })
        .then((res) => res.json())
        .then((res) => {
            hideLoader()
            if(res.success){
            setProducts(res.payload.product)
            }
        })
        .catch((err) => {
            hideLoader()
        });
    }, [update]);


    function searchProducts(){
        let url = `${process.env.NEXT_PUBLIC_API_URL}products`
        console.log(productname)
        if(productname){
            url = url + `?productname=like:${productname}`;
        }

        if(category && productname){
            url = url + `&productcategory=eq:${category}`;
        }

        if(category && !productname){
            url = url + `?productcategory=eq:${category}`;
        }


        showLoader()
        fetch(url, {
            method: "GET",
            headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
            },
        })
        .then((res) => res.json())
        .then((res) => {
            hideLoader()
            if(res.success){
            setProducts(res.payload.product)
            }
        })
        .catch((err) => {
            hideLoader()
        });
    }



    useEffect(()=> {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}category`, {
          method: "GET",
          headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
          }
        })
          .then((res) => res.json())
          .then((res) => {
            if(res.success){
               setCategoryList(res.payload.Category)
            } 
          })
          .catch((err) => {
            console.log(err)
          });
      },[])

    

    function deleteProduct(id:any){
        showLoader()
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}products/${id}`, {
            method: "DELETE",
            headers: {
              "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
              "Admin-Key": localStorage.getItem("adminKey")
            },
          })
            .then((res) => res.json())
            .then((res) => {
              hideLoader()
              if(res.success){
                setUpdate(update+1)
                toast.current?.show({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: res.message,
                    life: 3000
                });
              } else {
                toast.current?.show({
                    severity: 'warn',
                    summary: 'Warning Message',
                    detail: res.message,
                    life: 3000
                });
              }
            })
            .catch((err) => hideLoader());
    }

    const confirmationDialogFooter = (
        <>
            <Button type="button" label="No" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text />
            <Button type="button" label="Yes" icon="pi pi-check" onClick={() => {
                setDisplayConfirmation(false);
                deleteProduct(activeId)
            }} text autoFocus />
        </>
    );


    return (
        <div className="col-12">
                <Toast ref={toast} />
                <div className="card">
                    <h5>Product List</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-4">
                        <label htmlFor="productname">Product Name</label>
                            <InputText id="productname" type="text" onChange={(e) => setProductName(e.target.value)} />
                        </div>

                        <div className="field col-12 md:col-4">
                            <label htmlFor="state">Product Category</label>
                            <Dropdown id="state" value={categoryList.filter((data:any)=> data.id === category)[0]} onChange={(e) => setCategory(e.value.id)} options={categoryList} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>

                        <div className="field col-12 md:col-4">
                            <label htmlFor="search">Search</label>
                            <Button 
                                id="search"
                                icon="pi pi-check" 
                                label="Search"
                                onClick={() => searchProducts()}
                                style={{ width: '100%' }}

                            />
                        </div>
                    </div>



                    <DataTable value={products} paginator showGridlines className="p-datatable-gridlines" rows={10} scrollable  dataKey="id">
                        <Column field="createdAt" header="Date Created" body={(rowData) => new Date(rowData.createdAt).toLocaleDateString('en-GB')} sortable />
                        <Column field="productname" header="productname" sortable />
                        <Column 
                            field="pimage" 
                            header="Product Image" 
                            sortable 
                            body={(data) => (
                                <img 
                                    src={`${process.env.NEXT_PUBLIC_API_URL+data.pimage}`} 
                                    alt="Product" 
                                    className="shadow-2"
                                    loading="lazy" 
                                    width={100}
                                />
                            )}
                        />
                        <Column field="brandname" header="Brand Name" />
                        <Column field="sellingprice" header="Selling Price" body={(data) => `BDT ${data.sellingprice}`} sortable />
                        <Column field="buyingprice" header="Buying Price" body={(data) => `BDT ${data.buyingprice}`} sortable />
                        <Column field="category.name" header="Category" sortable />
                        <Column field="totalRating" header="Reviews" sortable body={()=> (
                            <Rating value="totalRating" readOnly cancel={false} />
                        )} />
                        <Column field="quantity" header="Inventory" sortable />
                        <Column header="Action" frozen style={{ flexGrow: 1, flexBasis: '120px' }} className="font-bold" alignFrozen="right" body={(rowData)=> (
                            <div className="action-icons">
                            {/* Edit Button with Tooltip */}
                            <Link href={`/products/edit/${rowData.id}`}>
                                <Button 
                                    icon="pi pi-pencil" 
                                    className="p-button-rounded p-button-info p-mr-2" 
                                    id={`edit-btn-${rowData.id}`} 
                                    aria-label="Edit"
                                />
                                <Tooltip target={`#edit-btn-${rowData.id}`} content="Edit" position="top" />
                            </Link>

            
                            {/* Delete Button with Tooltip */}
                            <Button 
                                icon="pi pi-trash" 
                                className="p-button-rounded p-button-danger p-mr-2" 
                                id={`delete-btn-${rowData.id}`} 
                                aria-label="Delete"
                                onClick={() => {
                                    setActiveId(rowData.id);
                                    setDisplayConfirmation(true)
                                }}
                            />
                            <Tooltip target={`#delete-btn-${rowData.id}`} content="Delete" position="top" />
                            <Dialog header="Confirmation" visible={displayConfirmation} onHide={() => setDisplayConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>Are you sure you want to proceed?</span>
                            </div>
                            </Dialog>
            
                            {/* Storm Button with Tooltip */}
                            <Button 
                                icon="pi pi-bolt" 
                                className="p-button-rounded p-button-warning" 
                                id={`storm-btn-${rowData.id}`} 
                                aria-label="Storm"
                            />
                            <Tooltip target={`#storm-btn-${rowData.id}`} content="Flash Sale" position="top" />
                        </div>
                        )} />
                    </DataTable>
                </div>
            </div>
    );
};

export default ProductsPage;
