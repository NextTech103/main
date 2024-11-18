"use client"
import customFetch from '@/fetch-wrapper';
import { useParams, useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import 'quill/dist/quill.snow.css';
import { useRef, useState, useEffect } from 'react';
import { useLoading } from '../../../layout/context/LoadingContext';

interface DropdownItem {
    name: string;
    code: string;
}
export default function DeliveryCharge() {
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const params = useParams();
    const [city, setCity] = useState("");
    const [chargeInside,setChargeInside] = useState<any>(0)
    const [chargeOutside,setChargeOutside] = useState<any>(0)
    const [deliveryInfoId,setDeliveryInfoId] = useState(0)
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const [deliveryInfoFound,setDeliveryInfoFound] = useState(false)
    const [image, setImage] = useState("");
    const { showLoader, hideLoader } = useLoading();

    
    useEffect(() => {
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}delivery-charge`, {
          method: "GET",
          headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if(res.success && res.payload.DeliveryCharge.length > 0){
              setDeliveryInfoFound(true)
              setCity(res.payload.DeliveryCharge[0].city)
              setChargeInside(res.payload.DeliveryCharge[0].chargeInside)
              setChargeOutside(res.payload.DeliveryCharge[0].chargeOutside)
              setDeliveryInfoId(res.payload.DeliveryCharge[0].id)
            }
          })
          .catch((err) => console.log(err));
    }, []);

    function updateDeliveryInfo(){
        showLoader()
        const updateData = {
          "city": city,
          "chargeInside": chargeInside,
          "chargeOutside": chargeOutside
        }
    
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}delivery-charge/${deliveryInfoId}`, {
          method: "PUT",
          body: JSON.stringify(updateData),
          headers: {
            "Content-Type": "application/json",
            "Authorization":localStorage.getItem("atoken"),
            "Admin-Key": localStorage.getItem("adminKey")
          },
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




    function addDeliveryInfo(){
        showLoader()
        const updateData = {
          "city": city,
          "chargeInside": chargeInside,
          "chargeOutside": chargeOutside
        }
    
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}delivery-charge`, {
          method: "POST",
          body: JSON.stringify(updateData),
          headers: {
            "Content-Type": "application/json",
            "Authorization":localStorage.getItem("atoken"),
            "Admin-Key": localStorage.getItem("adminKey")
          },
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
            <Button type="button" label="Yes" icon="pi pi-check" onClick={() => {
                setDisplayConfirmation(false);
                updateDeliveryInfo()
            }} text autoFocus />
        </>
    );
    

    return (
        <div>
            <Toast ref={toast} />
            <div className="col-12">
                <div className="card">
                    <h5>Set Delivery Charge</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-3">
                            <label htmlFor="cityname">City Name</label>
                            <InputText id="cityname" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>

                        <div className="field col-12 md:col-3">
                            <label htmlFor="inside">Charge Inside</label>
                            <InputText id="inside" type="number" value={chargeInside} onChange={(e:any) => setChargeInside(e.target.value)} />
                        </div>

                        <div className="field col-12 md:col-3">
                            <label htmlFor="outside">Charge Outside</label>
                            <InputText id="outside" type="number" value={chargeOutside} onChange={(e:any) => setChargeOutside(e.target.value)} />
                        </div>

                        {deliveryInfoFound ? 
                        <div className="field col-3">
                          <label>&nbsp;</label>
                          <Button label="Save" icon="pi pi-check" onClick={() => setDisplayConfirmation(true)}/>
                          <Dialog header="Confirmation" visible={displayConfirmation} onHide={() => setDisplayConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>Are you sure you want to proceed?</span>
                            </div>
                        </Dialog>
                        </div> : 
                        <div className="field col-3">
                            <label>&nbsp;</label>
                            <Button label="Save" icon="pi pi-check" onClick={() => addDeliveryInfo()}/>
                        </div>
                        }


                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
