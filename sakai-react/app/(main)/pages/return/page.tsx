'use client';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import customFetch from '@/fetch-wrapper';
import { useLoading } from '@/layout/context/LoadingContext';

const Return = () => {
    const toast = useRef<Toast>(null);
    const [returnPolicy, setReturnPolicy] = useState<any>('');
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const [returnInfoFound, setReturnInfoFound] = useState(false)
    const [returnInfoId, setReturnInfoId] = useState(0)
    const { showLoader, hideLoader } = useLoading();

    useEffect(() => {
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}return`, {
          method: "GET",
          headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if(res.success && res.payload.Return.length > 0){
              setReturnInfoFound(true)
              setReturnInfoId(res.payload.Return[0].id)
              setReturnPolicy(res.payload.Return[0].description)
            }
          })
          .catch((err) => console.log(err));
    }, []);


    function submitHandle(){
        showLoader()
        const url = returnInfoFound ? `${process.env.NEXT_PUBLIC_API_URL}return/${returnInfoId}` : `${process.env.NEXT_PUBLIC_API_URL}return`
        const data = {
            'description': returnPolicy
        }
        customFetch(url, {
          method: returnInfoFound ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":localStorage.getItem("atoken"),
            "Admin-Key": localStorage.getItem("adminKey")
          },
          body: JSON.stringify(data)
        })
          .then((res) => res.json())
          .then((res) => {
            hideLoader()
            if(res.success){
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
                <h2>Return Policy</h2>
                <Editor id="description" value={returnPolicy} onTextChange={(e: any) => setReturnPolicy(e.htmlValue)} style={{ height: '320px' }} placeholder="Build Your Page..." />
            </div>
            <div className="field col-12 md:col-3"></div>
            <div className="field col-12 md:col-3"></div>
            <div className="field col-12 md:col-3">
                <Button label="Save" icon="pi pi-check" onClick={() => setDisplayConfirmation(true)} />
                <Dialog header="Confirmation" visible={displayConfirmation} onHide={() => setDisplayConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        <span>Are you sure you want to proceed?</span>
                    </div>
                </Dialog>
            </div>
        </>
    );
};

export default Return;
