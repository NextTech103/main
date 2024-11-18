'use client';
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { TabPanel, TabView } from "primereact/tabview";
import { use, useEffect, useState } from "react";
import customFetch from "@/fetch-wrapper";
const OrderPage = () => {
    const [orderList,setOrderList] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);
    const [orders,setOrders] = useState([])
    const [activeTab, setActiveTab] = useState('pending')
    const [update, setUpdate] = useState(0)
    const handleTabChange = (e:any) => {
        setActiveIndex(e.index);
        setActiveTab(e.index == 0 ? 'pending' : e.index == 1 ? 'accepted' : e.index == 2 ? 'delivered' : 'cancelled');
        setUpdate(update+1)
    };


    useEffect(() => {
        setOrderList([])
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}orders?status=${activeTab}&isDirectSale=false`, {
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
                setOrderList(res.payload.order)
              }
            })
          .catch((err) => console.log(err));
      }, [update]);


      function updateOrderStatus(id:any,status:any){
        const updateStatus = {
            'status': status
        }
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}orders/${id}`, {
            method: "PUT",
            headers: {
              "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
              "Admin-Key": localStorage.getItem("adminKey")
            },
            body: JSON.stringify(updateStatus)
          })
            .then((res) => res.json())
            .then((res) => 
              {
                if(res.success){
                  setUpdate(update+1)
                }
              })
            .catch((err) => console.log(err));
      }


    return (
        <div className="col-12">
            <div className="card">
                    <h5>Order List</h5>
                    <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
                        <TabPanel header="New Order">
                        </TabPanel>
                        <TabPanel header="Running Order">
                        </TabPanel>
                        <TabPanel header="Order Delivered">
                        </TabPanel>
                        <TabPanel header="Order Cancelled">
                        </TabPanel>
                    </TabView>

                    <DataTable value={orderList} paginator showGridlines className="p-datatable-gridlines" rows={10} scrollable  dataKey="id">
                            <Column field="createdAt" header="Date Created" body={(rowData) => new Date(rowData.createdAt).toLocaleDateString('en-GB')} sortable />
                            <Column header="Delivery Information" body={(rowData) => (
                                <Card className="delivery-card">
                                    <div className="delivery-info">
                                        <div className="info-item">
                                            <strong>Name:</strong> <span>{rowData.username}</span>
                                        </div>
                                        <div className="info-item">
                                            <strong>Phone:</strong> <span>{rowData.deliveryPhoneNumber}</span>
                                        </div>
                                        <div className="info-item">
                                            <strong>Address:</strong> <span>{rowData.deliveryAddress}</span>
                                        </div>
                                        <div className="info-item">
                                            <strong>Note:</strong> <span>{rowData.deliverNote}</span>
                                        </div>
                                    </div>
                                </Card>
                            )} />
                            <Column 
                                field="icon" 
                                header="Product Information"  
                                body={(data) => (
                                    <DataTable value={data.orderItems} responsiveLayout="scroll">
                                        <Column field="productName" header="Product Name" />
                                        <Column field="quantity" header="Quantity" />
                                        <Column field="price" header="Price"/>
                                    </DataTable>
                                )}
                            />
                            <Column header="Action" frozen style={{ flexGrow: 1, flexBasis: '120px' }} className="font-bold" alignFrozen="right" body={(rowData)=> (
                                <div className="action-icons">
                                    <Button 
                                            icon="pi pi-check" 
                                            className="p-button-rounded p-button-info p-mr-2" 
                                            id={`edit-btn-${rowData.id}`} 
                                            label="Accept"
                                            style={{width:'100%',marginBottom:'5px'}}
                                            onClick={()=> updateOrderStatus(rowData.id,'accepted')}
                                        />
                                    <Button 
                                        icon="pi pi-times" 
                                        className="p-button-rounded p-button-danger p-mr-2" 
                                        id={`delete-btn-${rowData.id}`} 
                                        aria-label="Delete"
                                        label="Decline"
                                        style={{width:'100%'}}
                                        onClick={()=> updateOrderStatus(rowData.id,'cancelled')}
                                    />
                                </div>
                            )} />
                            </DataTable>
                </div>
        </div>
    );
};

export default OrderPage;
