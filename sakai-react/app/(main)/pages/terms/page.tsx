'use client';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import { Toast } from 'primereact/toast';
import React, { useState, useRef, useEffect } from 'react';
import { useLoading } from '@/layout/context/LoadingContext';
import customFetch from '@/fetch-wrapper';

const Terms = () => {
    const toast = useRef<Toast>(null);
    const [terms, setTerms] = useState<any>('');
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const [termsInfoFound, setTermsInfoFound] = useState(false)
    const [termsInfoId, setTermsInfoId] = useState(0)
    const { showLoader, hideLoader } = useLoading();
    

    useEffect(() => {
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}terms`, {
          method: "GET",
          headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if(res.success && res.payload.Terms.length > 0){
              setTermsInfoFound(true)
              setTermsInfoId(res.payload.Terms[0].id)
              setTerms(res.payload.Terms[0].description)
              console.log(terms)
            }
          })
          .catch((err) => console.log(err));
    }, []);


    function submitHandle(){
        showLoader()

        const url = termsInfoFound ? `${process.env.NEXT_PUBLIC_API_URL}terms/${termsInfoId}` : `${process.env.NEXT_PUBLIC_API_URL}terms`
        const data = {
            'description': terms
        }
        customFetch(url, {
          method: termsInfoFound ? "PUT" : "POST",
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
                <h2>Terms & Conditions</h2>
                <Editor id="description" value={terms} onTextChange={(e: any) => setTerms(e.htmlValue)} style={{ height: '320px' }} placeholder="Build Your Page..." />
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

export default Terms;
