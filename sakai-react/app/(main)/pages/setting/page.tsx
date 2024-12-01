'use client';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import customFetch from '@/fetch-wrapper';
import { useLoading } from '@/layout/context/LoadingContext';

const Return = () => {
    const toast = useRef<Toast>(null);
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const [siteInfoFound, setSiteInfoFound] = useState(false)
    const [siteInfoId, setSiteInfoId] = useState(0)
    const [siteTitle, setSiteTitle] = useState('')
    const [siteIcon, setSiteIcon] = useState('')
    const [siteIconPreview, setSiteIconPreview] = useState('')
    const { showLoader, hideLoader } = useLoading();
    const [update,setUpdate] = useState(0)

    useEffect(() => {
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}siteinfo`, {
          method: "GET",
          headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if(res.success && res.payload.SiteInfo.length > 0){
              setSiteInfoFound(true)
              setSiteInfoId(res.payload.SiteInfo[0].id)
              setSiteTitle(res.payload.SiteInfo[0].siteTitle)
              setSiteIconPreview(res.payload.SiteInfo[0].siteIcon)
            }
          })
          .catch((err) => console.log(err));
    }, [update]);


    function submitHandle(){
        showLoader()

        const data = new FormData();
        data.append("siteTitle",siteTitle)
        data.append("siteIcon",siteIcon)
        const url = siteInfoFound ? `${process.env.NEXT_PUBLIC_API_URL}siteinfo/${siteInfoId}` : `${process.env.NEXT_PUBLIC_API_URL}siteinfo`
        customFetch(url, {
          method: siteInfoFound ? "PUT" : "POST",
          headers: {
            "Authorization":localStorage.getItem("atoken"),
            "Admin-Key": localStorage.getItem("adminKey")
          },
          body: data
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
          .catch((err) => {
            hideLoader()
          });
    }

    const confirmationDialogFooter = (
        <>
            <Button type="button" label="No" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text />
            <Button
                type="button"
                label="Yes"
                icon="pi pi-check"
                onClick={() => {
                    setDisplayConfirmation(false);
                    submitHandle();
                }}
                text
                autoFocus
            />
        </>
    );

    return (
        <>
            <Toast ref={toast} />
            <div className="field col-12 md:col-12">
                <h2>Site Setting</h2>
            </div>
            

            <div className="flex align-items-center justify-content-center">
                <img 
                    src={`${process.env.NEXT_PUBLIC_API_URL}${siteIconPreview}`}
                    alt="Circular Image" 
                    className="border-circle w-10rem h-10rem"
                />
            </div>
            <div className="p-fluid formgrid grid mt-5">
                <div className="field col-12 md:col-3">
                <label>Site Title</label>
                <InputText id="title" type="text" value={siteTitle} onChange={(e) => setSiteTitle(e.target.value)} />
                </div>
                <div className="field col-12 md:col-3">
                <label>Icon</label>
                <FileUpload style={{ width: '100% !important' }} mode="basic" name="image" accept="image/*" maxFileSize={1000000} auto={false} multiple={false} onSelect={(e:any) => setSiteIcon(e.files[0])} />
                </div>
                <div className="field col-12 md:col-3">
                    <label>Save</label>
                    <Button label="Save" icon="pi pi-check" onClick={() => setDisplayConfirmation(true)} />
                    <Dialog header="Confirmation" visible={displayConfirmation} onHide={() => setDisplayConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            <span>Are you sure you want to proceed?</span>
                        </div>
                    </Dialog>
                </div>
            </div>
            
        </>
    );
};

export default Return;
