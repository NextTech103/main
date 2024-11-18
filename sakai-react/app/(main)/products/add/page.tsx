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
import { useLoading } from '../../../../layout/context/LoadingContext';
import { FileUpload } from 'primereact/fileupload';
import customFetch from '@/fetch-wrapper';

interface DropdownItem {
    name: string;
    code: string;
}
export default function AddProduct() {
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
    const [pimage, setPimage] = useState("");
    const [pimage2, setPimage2] = useState("");
    const [pimage3, setPimage3] = useState("");
    const { showLoader, hideLoader } = useLoading();


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


      function submitHandle() {
        showLoader()
        const data = new FormData();
        data.append("productname", pname);
        data.append("buyingprice", pprice);
        data.append("sellingprice", price);
        data.append("regularprice", rprice);
        data.append("quantity", quan);
        data.append("pimage", pimage);
        data.append("pimage2", pimage2);
        data.append("pimage3", pimage3);
        data.append("productcategory", category);
        data.append("brandname", brand);
        data.append("productdescription", des);
        data.append("supplier",supplier)
    
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}products`, {
          method: "POST",
          headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
          },
          body: data,
        })
          .then((res) => res.json())
          .then((res) => {
            hideLoader();
            if(res.success){
                toast.current?.show({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: res.message,
                    life: 3000
                });
                router.push('/products/list')
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
                summary: 'Error Message',
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
                submitHandle()
            }} text autoFocus />
        </>
    );
    

    return (
        <div>
            <Toast ref={toast} />
            <div className="col-12">
                <div className="card">
                    <h5>Add New Product</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="productname">Product Name</label>
                            <InputText id="productname" type="text" onChange={(e) => setPname(e.target.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="quantity">Quantity</label>
                            <InputText id="quantity" type="text" onChange={(e) => setQuan(e.target.value)}  />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="state">Product Category</label>
                            <Dropdown id="state" value={categoryList.filter((data:any)=> data.id === category)[0]} onChange={(e) => setCategory(e.value.id)} options={categoryList} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="brandname">Brand Name</label>
                            <InputText id="brandname" onChange={(e)=> setBrand(e.target.value)} type="text" />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="buyingprice">Buying price</label>
                            <InputText id="buyingprice" onChange={(e)=> setPprice(e.target.value)} type="text" />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="sellingprice">Selling price</label>
                            <InputText id="sellingprice" onChange={(e)=> setPrice(e.target.value)} type="text" />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="regularprice">Regular Price</label>
                            <InputText id="regularprice" onChange={(e)=> setRprice(e.target.value)} type="text" />
                        </div>

                        <div className="field col-12 md:col-3">
                           <label>Product Image 1</label>
                           <FileUpload style={{ width: '100% !important' }} mode="basic" name="pimage" accept="image/*" maxFileSize={1000000} auto={false} multiple={false} onSelect={(e:any) => setPimage(e.files[0])} />
                        </div>
                        <div className="field col-12 md:col-3">
                           <label>Product Image 2</label>
                           <FileUpload style={{ width: '100% !important' }} mode="basic" name="pimage2" accept="image/*" maxFileSize={1000000} auto={false} multiple={false} onSelect={(e:any) => setPimage2(e.files[0])} />
                        </div>
                        <div className="field col-12 md:col-3">
                           <label>Product Image 3</label>
                           <FileUpload style={{ width: '100% !important' }} mode="basic" name="pimage3" accept="image/*" maxFileSize={1000000} auto={false} multiple={false} onSelect={(e:any) => setPimage3(e.files[0])} />
                        </div>
                        <div className="field col-12 md:col-3">
                        </div>

                        <div className="field col-12 md:col-12">
                            <label htmlFor="description">Product Description</label>
                            <Editor 
                                id="description"
                                value={des} 
                                onTextChange={(e:any) => setDes(e.htmlValue)} 
                                style={{ height: '320px' }} 
                                placeholder="Write something here..."
                            />
                        </div>
                        <div className="field col-12 md:col-3"></div>
                        <div className="field col-12 md:col-3"></div>
                        <div className="field col-12 md:col-3"></div>
                        <div className="field col-12 md:col-3">
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
