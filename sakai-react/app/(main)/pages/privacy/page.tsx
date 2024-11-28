'use client';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import React, { useState } from 'react';

const Privacy = () => {
    const [privacy, setPrivacy] = useState<any>('');
    const [displayConfirmation, setDisplayConfirmation] = useState(false);

    function submitHandle() {
        console.log('HIIIIII');
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
