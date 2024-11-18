"use client"
import { useParams, useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import 'quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { useLoading } from '../../../../../layout/context/LoadingContext';
import customFetch from '@/fetch-wrapper';

interface DropdownItem {
    name: string;
    code: string;
}
export default function EditProduct() {
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const params = useParams();
    const { id } = params;  // Access the dynamic ID from useParams
    const [cname, setCname] = useState("");
    const [image, setImage] = useState("");
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const { showLoader, hideLoader } = useLoading();




    useEffect(()=> {
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}category/${id}`, {
          method: "GET",
          headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
          }
        })
          .then((res) => res.json())
          .then((res) => {
            if(res.success){
               setCname(res.payload.Category.name)
               setImage(res.payload.Category.image)
            } 
          })
          .catch((err) => {
            console.log(err)
          });
      },[])


    function updateCategory(){
        showLoader();
        const data = new FormData();
        data.append("name", cname);
        if(image){
           data.append("icon", image);
        }
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}category/${id}`, {
            method: "PUT",
            headers: {
              "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
              "Admin-Key": localStorage.getItem("adminKey")
            },
            body : data,
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

                router.push('/category/list')
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
                updateCategory()
            }} text autoFocus />
        </>
    );
    

    return (
        <div>
            <Toast ref={toast} />
            <div className="col-12">
                <div className="card">
                    <Button label="Go Back" onClick={()=> router.push('/category/list')} icon="pi pi-angle-left" />
                    <h5>Edit Category</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="productname">Category Name</label>
                            <InputText id="productname" type="text" value={cname} onChange={(e) => setCname(e.target.value)} />
                        </div>
                        <div className="field col-12 md:col-3">
                           <label>Icon</label>
                           <FileUpload style={{ width: '100% !important' }} mode="basic" name="image" accept="image/*" maxFileSize={1000000} auto={false} multiple={false} onSelect={(e:any) => setImage(e.files[0])} />
                        </div>
                        
                        <div className="field col-12 md:col-3">
                          <label>&nbsp;</label>
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
