'use client';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import { Toast } from 'primereact/toast';
import React, { useState, useEffect, useRef } from 'react';
import customFetch from '@/fetch-wrapper';
import { useLoading } from '@/layout/context/LoadingContext';

const Privacy = () => {
    const toast = useRef<Toast>(null);
    const [privacy, setPrivacy] = useState<any>('');
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const [privacyInfoFound, setPrivacyInfoFound] = useState(false)
    const [privacyInfoId, setPrivacyInfoId] = useState(0)
    const { showLoader, hideLoader } = useLoading();

    useEffect(() => {
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}privacy`, {
          method: "GET",
          headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if(res.success && res.payload.Privacy.length > 0){
              setPrivacyInfoFound(true)
              setPrivacyInfoId(res.payload.Privacy[0].id)
              setPrivacy(res.payload.Privacy[0].description)
            }
          })
          .catch((err) => console.log(err));
    }, []);


    function submitHandle(){
        showLoader()

        const url = privacyInfoFound ? `${process.env.NEXT_PUBLIC_API_URL}privacy/${privacyInfoId}` : `${process.env.NEXT_PUBLIC_API_URL}privacy`
        const data = {
            'description': privacy
        }
        customFetch(url, {
          method: privacyInfoFound ? "PUT" : "POST",
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
                <h2>Privacy Policy</h2>
                <Editor id="description" value={privacy} onTextChange={(e: any) => setPrivacy(e.htmlValue)} style={{ height: '320px' }} placeholder="Build Your Page..." />
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

export default Privacy;
