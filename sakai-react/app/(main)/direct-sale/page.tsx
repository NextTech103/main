"use client"
import React, {  useState , useRef } from 'react';
import { useRouter } from 'next/navigation';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';
import { Toast } from "primereact/toast";
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { useLoading } from '@/layout/context/LoadingContext';
import customFetch from '@/fetch-wrapper';

const POSPage = () => {
    const toast = useRef<Toast>(null);
    const router = useRouter()
    const [cart, setCart] = useState<any>([]);
    const [products, setProducts] = useState([])
    const [selectedOption, setSelectedOption] = useState('Pickup'); // Default option
    const [username, setUsername] = useState('')
    const [deliveryPhoneNumber, setDeliveryPhoneNumber] = useState('')
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryCharge, setDeliveryCharge] = useState(0)
    const [deliverNote, setDeliveryNote] = useState('')
    const { showLoader, hideLoader } = useLoading();

    const handleTabChange = (e:any) => {
        setSelectedOption(e.index === 0 ? 'Pickup' : 'Delivery');
    };


    const addToCart = (product:any) => {
        const alreadyExist = cart.filter((item:any) => item.id === product.id)
        if(alreadyExist.length > 0){
            toast.current?.show({
                severity: 'warn',
                summary: 'Warning Message',
                detail: 'Products already added',
                life: 3000
            });
        } else {
            const productInfo = {
                id: product.id,
                name : product.productname,
                price: product.sellingprice,
                quantity: 1,
                totalQuantity : product.quantity
            }
            setCart([...cart, { ...productInfo }]);
            setProducts([])
        }
        
    }

    const updateQuantity = (product:any, quantity:any) => {
        setCart(cart.map((item:any) => item.id === product.id ? { ...item, quantity } : item));
    };

    const removeFromCart = (productId:any) => {
        setCart(cart.filter((item:any) => item.id !== productId));
    };

    const totalAmount = cart.reduce((acc:any, item:any) => acc + item.price * item.quantity, 0);
    const totalQuantity = cart.reduce((acc:any, item:any) => acc + item.quantity, 0);

     

    function searchProducts(searchValue:any){
        if(searchValue.length > 2){
            setTimeout(()=> {
                const url = `${process.env.NEXT_PUBLIC_API_URL}products?productname=like:${searchValue}`
                fetch(url, {
                    method: "GET",
                    headers: {
                    "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
                    "Admin-Key": localStorage.getItem("adminKey")
                    },
                })
                .then((res) => res.json())
                .then((res) => {
                    if(res.success){
                      setProducts(res.payload.product)
                    }
                })
                .catch((err) => {
                    console.log(err)
                });
            },500)
        }
    }



    function orderprod() {
        if(selectedOption == 'Pickup'){
           setDeliveryAddress('Pickup');
        }
        if(username.trim() === ''){
            toast.current?.show({
                severity: 'warn',
                summary: 'Warning Message',
                detail: 'Please provide a username',
                life: 3000
            });
            return false;
        }

        if(deliveryPhoneNumber.trim() === ''){
            toast.current?.show({
                severity: 'warn',
                summary: 'Warning Message',
                detail: 'Please provide a phone number',
                life: 3000
            });
            return false;
        }

        if(cart.length === 0){
            toast.current?.show({
                severity: 'warn',
                summary: 'Warning Message',
                detail: 'No product available on cart',
                life: 3000
            });
            return false;
        }

        showLoader();
        const data = {
          "quantity": totalQuantity,
          "deliveryAddress": deliveryAddress,
          "deliveryPhoneNumber": deliveryPhoneNumber,
          "deliverNote": deliverNote,
          "deliveryCharge":deliveryCharge,
          "username":username,
          "isDirectSale":true,
          "orderItem": cart
        }
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}orders`, {
          method: "POST",
          headers: {
            "Content-Type":"Application/Json",
            "Authorization":localStorage.getItem("atoken"),
            "Admin-Key": localStorage.getItem("adminKey")
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            hideLoader()
            if (res.success) {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: res.message,
                    life: 3000
                });
                router.push('/sales')
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
            toast.current?.show({
                severity: 'warn',
                summary: 'Warning Message',
                detail: 'Something Failed',
                life: 3000
            });
            hideLoader()
          });
      }
    

    return (
        <div className="grid">
            <Toast ref={toast} />
            {/* Product List */}
            <div className="col-12 md:col-4">
                <Panel header="Product List">
                    
                    <InputText 
                      style={{width:'100%'}}
                      placeholder="Search Products..."
                      onChange={(e)=> searchProducts(e.target.value)}
                    ></InputText>
                    {products.length > 0 ? <DataTable value={products} responsiveLayout="scroll">
                        <Column field="productname" header="Product" />
                        <Column field="sellingprice" header="Price" />
                        <Column
                            body={(product) => (
                                <Button area-label="Add to Cart" icon="pi pi-plus" onClick={() => addToCart(product)} />
                            )}
                            header="Action"
                        />
                    </DataTable> : <></>}
                </Panel>
            </div>

            {/* Shopping Cart */}
            <div className="col-12 md:col-8">
                <Panel header="Shopping Cart">
                    <DataTable value={cart} responsiveLayout="scroll">
                        <Column field="name" header="Product" />
                        <Column field="price" header="Price" />
                        <Column
                            field="quantity"
                            header="Quantity"
                            body={(item, index) => (
                                <InputNumber
                                    value={item.quantity}
                                    onValueChange={(e) => updateQuantity(item, e.value)}
                                    showButtons
                                    min={1}
                                    max={item.totalQuantity}
                                />
                            )}
                        />
                        <Column
                            header="Remove"
                            body={(item) => (
                                <Button icon="pi pi-trash" className="p-button-danger" onClick={() => removeFromCart(item.id)} />
                            )}
                        />
                    </DataTable>
                </Panel>

                <Panel header="User Information" className='mt-4'>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="productname">User Name</label>
                            <InputText id="productname" type="text" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="quantity">Phone Number</label>
                            <InputText id="quantity" type="text" onChange={(e) => setDeliveryPhoneNumber(e.target.value)}/>
                        </div>
                    </div>
                    
                    {/* TabView for Pickup and Delivery */}
                    <TabView activeIndex={selectedOption === 'Pickup' ? 0 : 1} onTabChange={handleTabChange}>
                        <TabPanel header="Pickup"></TabPanel>
                        <TabPanel header="Delivery">
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="productname">Delivery Charge</label>
                                    <InputNumber id="productname" onChange={(e:any) => setDeliveryCharge(e.value)} />
                                </div>
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="quantity">Delivery Note</label>
                                    <InputText id="quantity" type="text" onChange={(e) => setDeliveryNote(e.target.value)}/>
                                </div>
                                <div className="field col-12 md:col-12">
                                    <label htmlFor="quantity">Delivery Address</label>
                                    <InputTextarea id="quantity" onChange={(e) => setDeliveryAddress(e.target.value)}/>
                                </div>
                                
                            </div>
                        </TabPanel>
                    </TabView>
                    <Card>
                        <h5>Total Amount: ${totalAmount.toFixed(2)}</h5>
                        <Button label="Proceed to Checkout" icon="pi pi-check" className="p-button-success" onClick={()=> orderprod()} />
                    </Card>
                </Panel>


                    
                
            </div>

            
        </div>
    );
};

export default POSPage;
