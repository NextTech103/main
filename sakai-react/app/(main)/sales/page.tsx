'use client';

import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { OverlayPanel } from "primereact/overlaypanel";
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";
import customFetch from "@/fetch-wrapper";
import { InputText } from "primereact/inputtext";
import { useLoading } from '../../../layout/context/LoadingContext';

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
const SalePage = () => {
    const op2 = useRef<OverlayPanel>(null);
    const toast = useRef<Toast>(null);
    const [saleList,setSaleList] = useState([])
    const [activeProductList,setActiveProductList] = useState([])
    const [update,setUpdate] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const { showLoader, hideLoader } = useLoading();


    const toggleDataTable = (event: ButtonEvent) => {
      op2.current?.toggle(event);
    };

    const onSelectionChange = (e: any): void => {
      setActiveProductList(e.value);
  };

    useEffect(() => {
        showLoader()
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}orders?status=delivered`, {
          method: "GET",
          headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
          },
        })
          .then((res) => res.json())
          .then((res) => 
            {
              hideLoader()
              if(res.success && res.payload.order.length){
                setSaleList(res.payload.order)
              } else {
                toast.current?.show({
                  severity: 'warn',
                  summary: 'Warning Message',
                  detail: res.message,
                  life: 3000
                });
              }
            })
          .catch((err) => console.log(err));
      }, [update]);



    function searchProducts(searchTerm: string){
      setTimeout(()=> {
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}orders?status=delivered&search=${searchTerm}&searchBy=username,deliveryAddress,deliveryPhoneNumber`, {
          method: "GET",
          headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
          },
        })
          .then((res) => res.json())
          .then((res) => 
            {
              if(res.success && res.payload.order.length){
                setSaleList(res.payload.order)
              } else {
                setSaleList([])
                toast.current?.show({
                  severity: 'warn',
                  summary: 'Warning Message',
                  detail: 'No results found',
                  life: 3000
                });
              }
            })
          .catch((err) => console.log(err));
      },1000)
    }


    
    return (
        <div className="col-12">
                <Toast ref={toast} />
                <div className="card">
                    
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-4">
                        <label htmlFor="searchterm">Search Data</label>
                            <InputText id="searchterm" placeholder="Search By Name , phonenumber, address , " type="text" onChange={(e) => searchProducts(e.target.value)} />
                        </div>

                        
                    </div>

                    <DataTable value={saleList} paginator showGridlines className="p-datatable-gridlines" rows={10} scrollable  dataKey="id">
                        <Column field="createdAt" header="Date Created" body={(rowData) => new Date(rowData.createdAt).toLocaleDateString('en-GB')} sortable />
                        <Column field="username" header="User Name" />
                        <Column field="deliveryAddress" header="Delivery Address" />
                        <Column field="deliveryPhoneNumber" header="Phone Number" />
                        <Column header="Order Type" body={(rowData) => (
                          <span>{rowData.isDirectSale ? 'Direct Sale' : 'Online'}</span>
                        )}/>
                        <Column header="Action" frozen style={{ flexGrow: 1, flexBasis: '120px' }} className="font-bold" alignFrozen="right" body={(rowData)=> (
                            <div className="action-icons">
                              <Button 
                                  className="p-button-rounded p-button-info p-mr-2" 
                                  id={`delete-btn-${rowData.id}`} 
                                  label="Products"
                                  onClick={($event)=> {
                                    setActiveProductList(rowData.orderItems) 
                                    toggleDataTable($event)
                                  }}
                              />
                              <OverlayPanel ref={op2} appendTo={typeof window !== 'undefined' ? document.body : null} showCloseIcon id="overlay_panel" style={{ width: '450px' }}>
                                  <DataTable value={activeProductList} selection={activeProductList || undefined} onSelectionChange={onSelectionChange} selectionMode="single" responsiveLayout="scroll" paginator rows={5}>
                                      <Column header="Name" field="productName"  sortable headerStyle={{ minWidth: '10rem' }} />
                                      <Column header="Image" headerStyle={{ minWidth: '10rem' }} body={(rowData)=> (
                                         <img
                                              src={`${process.env.NEXT_PUBLIC_API_URL + rowData.product.pimage}`}
                                              alt={rowData.product.pimage}
                                              className="product-image"
                                              width="60"
                                              style={{
                                                  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)'
                                              }}
                                          />
                                      )} />
                                      <Column header="Quantity" field="quantity" headerStyle={{ minWidth: '10rem' }} />
                                      <Column header="Price" field="price" sortable headerStyle={{ minWidth: '8rem' }} />
                                  </DataTable>
                              </OverlayPanel>
                            </div>
                        )} />
                    </DataTable>
                </div>
            </div>
    );
};

export default SalePage;
