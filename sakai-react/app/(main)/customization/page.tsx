"use client"
import customFetch from '@/fetch-wrapper';
import { useParams, useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import { Carousel } from 'primereact/carousel';
import { Tooltip } from 'primereact/tooltip';
import 'quill/dist/quill.snow.css';
import { useRef, useState, useEffect } from 'react';
import { useLoading } from '../../../layout/context/LoadingContext';
import { it } from 'node:test';

interface DropdownItem {
    name: string;
    code: string;
}
export default function DeliveryCharge() {
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const params = useParams();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [categoryList,setCategoryList] = useState([])
    const [covers, setCovers] = useState([])
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const [activeId,setActiveId] = useState(0)
    const [update,setUpdate] = useState(0)
    const { showLoader, hideLoader } = useLoading();

    
    useEffect(() => {
        showLoader()
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}covers`, {
          method: "GET",
          headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
          },
        })
          .then((res) => res.json())
          .then((res) => {
            hideLoader()
            if(res.success){
              setCovers(res.payload.cover)
            }
          })
          .catch((err) => hideLoader());
      }, [update]);

    useEffect(()=> {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}category`, {
          method: "GET",
          headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
          }
        })
          .then((res) => res.json())
          .then((res) => {
            if(res.success){
               setCategoryList(res.payload.Category)
            } 
          })
          .catch((err) => {
            console.log(err)
          });
      },[])

    
    function submitHandle() {

        if(title === '' || category === '' || image === ''){
            toast.current?.show({
                severity: 'warn',
                summary: 'Warning Message',
                detail: 'Please fill all the input fields',
                life: 3000
            });
            return false;
        }
        showLoader()
        const data = new FormData();
        data.append("covertitle",title)
        data.append("covercategory",category)
        data.append("coverimage", image);
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}covers`, {
          method: "POST",
          body: data,
          headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
          },
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
                setUpdate(update+1)
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


    function delcover(x:any){
    showLoader()
    const data = new FormData();
    data.append("id", x);

    customFetch(`${process.env.NEXT_PUBLIC_API_URL}covers/${x}`, {
        method: "DELETE",
        headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
        "Admin-Key": localStorage.getItem("adminKey")
        },
    })
        .then((res) => res.json())
        .then(res=> {
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

      const carouselResponsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];


    const carouselItemTemplate = (image:any) => {
        return (
            <div className="border-1 surface-border border-round m-1 text-center py-5">
                <div className="mb-3">
                    <img src={process.env.NEXT_PUBLIC_API_URL+image.coverimage} className="w-12 shadow-2" />
                </div>
                <Button 
                    icon="pi pi-trash" 
                    className="p-button-rounded p-button-danger p-mr-2" 
                    id={`delete-btn-${image.id}`} 
                    aria-label="Delete"
                    onClick={() => {
                        setActiveId(image.id);
                        setDisplayConfirmation(true)
                    }}
                />
                <Tooltip target={`#delete-btn-${image.id}`} content="Delete" position="top" />
                <Dialog header="Confirmation" visible={displayConfirmation} onHide={() => setDisplayConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>Are you sure you want to proceed?</span>
                </div>
                </Dialog>
            </div>
        );
    };


    const confirmationDialogFooter = (
        <>
            <Button type="button" label="No" icon="pi pi-times" onClick={() => {
                setDisplayConfirmation(false)
            }} text />
            <Button type="button" label="Yes" icon="pi pi-check" onClick={() => {
                setDisplayConfirmation(false);
                delcover(activeId)
            }} text autoFocus />
        </>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="col-12">
                <div className="card">
                    <h5>Set Website Cover</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-3">
                            <label htmlFor="cityname">Cover Title</label>
                            <InputText id="cityname" type="text" onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="field col-12 md:col-3">
                            <label htmlFor="state">Product Category</label>
                            <Dropdown id="state" value={categoryList.filter((data:any)=> data.id === category)[0]} onChange={(e) => setCategory(e.value.id)} options={categoryList} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>

                        <div className="field col-12 md:col-3">
                           <label>Image <small>320*900</small></label>
                           <FileUpload style={{ width: '100% !important' }} mode="basic" name="image" accept="image/*" maxFileSize={1000000} auto={false} multiple={false} onSelect={(e:any) => setImage(e.files[0])} />
                        </div>

                        <div className="field col-12 md:col-3">
                          <label>&nbsp;</label>
                          <Button label="Save" icon="pi pi-check" onClick={()=> submitHandle()}/>
                        </div>

                        
                        
                    </div>
                    <Carousel value={covers} numVisible={3} numScroll={3} responsiveOptions={carouselResponsiveOptions} itemTemplate={carouselItemTemplate}></Carousel>
                </div>
            </div>
        </div>
    );
}
