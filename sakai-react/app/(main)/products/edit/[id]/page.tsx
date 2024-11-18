"use client"
import { useState, useMemo, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import 'quill/dist/quill.snow.css';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { useRouter } from 'next/navigation';
import { Dialog } from 'primereact/dialog';
import { useLoading } from '../../../../../layout/context/LoadingContext';


interface DropdownItem {
    name: string;
    code: string;
}
export default function EditProduct() {
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const params = useParams();
    const { id } = params;  // Access the dynamic ID from useParams
    const [dropdownItem, setDropdownItem] = useState<DropdownItem | null>(null);
    const [loading,setLoading] = useState(false)
    const [product,setProduct] = useState({})
    const [pname, setPname] = useState("");
    const [quan, setQuan] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [pprice, setPprice] = useState("");
    const [rprice, setRprice] = useState("");
    const [supplier,setSupplier] = useState("");
    const [activeId, setActiveId] = useState("");
    const [des,setDes] = useState<any>('')
    const [categoryList, setCategoryList] = useState([])
    const [count,setCount] = useState(0)
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const { showLoader, hideLoader } = useLoading();


    useEffect(() => {
        setLoading(true)
        showLoader();
        fetch(`${process.env.NEXT_PUBLIC_API_URL}products/${id}`, {
            method: "GET",
            headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
            },
        })
        .then((res) => res.json())
        .then((res) => {
        hideLoader();
            if(res.success){
              
              setPname(res.payload.product.productname)
              setPprice(res.payload.product.sellingprice)
              setRprice(res.payload.product.regularprice)
              setPrice(res.payload.product.buyingprice)
              setQuan(res.payload.product.quantity)
              setCategory(res.payload.product.productcategory)
              setBrand(res.payload.product.brandname)
              setSupplier(res.payload.product.supplier)
              setDes(res.payload.product.productdescription)
              setActiveId(res.payload.product.id)
            }
        })
        .catch((err) => console.log(err));
    }, []);


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


    function updateProduct(){
        showLoader();
          const updateData = {
            "productname": pname,
            "buyingprice": pprice,
            "sellingprice": price,
            "regularprice":rprice,
            "quantity": quan,
            "productcategory": category,
            "brandname": brand,
            "productdescription":des,
             "supplier":supplier
          }
          fetch(`${process.env.NEXT_PUBLIC_API_URL}products/${activeId}`, {
            method: "PUT",
            body : JSON.stringify(updateData),
            headers: {
              "Content-Type": "application/json",
              "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
              "Admin-Key": localStorage.getItem("adminKey")
            },
          })
            .then((res) => res.json())
            .then((res) => {
            hideLoader();
              if(res.success){
                setCount(count+1)
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
            .catch((err) => {
                hideLoader();
                toast.current?.show({
                    severity: 'error',
                    summary: 'Warning Message',
                    detail: 'Something went wrong',
                    life: 3000
                });
            });
        
    }



    const confirmationDialogFooter = (
        <>
            <Button type="button" label="No" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text />
            <Button type="button" label="Yes" icon="pi pi-check" onClick={() => {
                setDisplayConfirmation(false);
                updateProduct()
            }} text autoFocus />
        </>
    );
    

    return (
        <div>
            <Toast ref={toast} />
            <div className="col-12">
                <div className="card">
                    <Button label="Go Back" onClick={()=> router.push('/products/list')} icon="pi pi-angle-left" />
                    <h5>Edit Product</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="productname">Product Name</label>
                            <InputText id="productname" type="text" value={pname} onChange={(e) => setPname(e.target.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="quantity">Quantity</label>
                            <InputText id="quantity" type="text" value={quan} onChange={(e) => setQuan(e.target.value)}  />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="state">Product Category</label>
                            <Dropdown id="state" value={categoryList.filter((data:any)=> data.id === category)[0]} onChange={(e) => setCategory(e.value.id)} options={categoryList} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="brandname">Brand Name</label>
                            <InputText id="brandname" value={brand} onChange={(e)=> setBrand(e.target.value)} type="text" />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="buyingprice">Buying price</label>
                            <InputText id="buyingprice" value={pprice} onChange={(e)=> setPprice(e.target.value)} type="text" />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="sellingprice">Selling price</label>
                            <InputText id="sellingprice" value={price} onChange={(e)=> setPrice(e.target.value)} type="text" />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="regularprice">Regular Price</label>
                            <InputText id="regularprice" value={rprice} onChange={(e)=> setRprice(e.target.value)} type="text" />
                        </div>
                        {des ? <div className="field col-12">
                            <label htmlFor="description">Address</label>
                            <Editor 
                                id="description"
                                value={des} 
                                onTextChange={(e:any) => setDes(e.htmlValue)} 
                                style={{ height: '320px' }} 
                                placeholder="Write something here..."
                            />
                        </div> : null}
                        <div className="field col-3"></div>
                        <div className="field col-3"></div>
                        <div className="field col-3"></div>
                        <div className="field col-3">
                          <Button label="Save" icon="pi pi-check" onClick={() => setDisplayConfirmation(true)}/>
                          <Dialog header="Confirmation" visible={displayConfirmation} onHide={() => setDisplayConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>Are you sure you want to proceed?</span>
                            </div>
                          </Dialog>
                        </div>


                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
