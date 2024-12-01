'use client';

import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import Link from "next/link";
import { useLoading } from '../../../../layout/context/LoadingContext';
import { useSearchParams } from "next/navigation";

const CategoryPage = () => {
    const [loading,setLoading] = useState(false)
    const [products,setProducts] = useState([])
    const [categoryList,setCategoryList] = useState([]);
    const { showLoader, hideLoader } = useLoading(); 
    const searchParams = useSearchParams();
    const ref = searchParams.get('ref');

    useEffect(()=> {
        showLoader();
        const url = `${process.env.NEXT_PUBLIC_API_URL}category${ref === 'updated' ? '?no-cache=true' : ''}`
        fetch(url, {
          method: "GET",
          headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
          }
        })
          .then((res) => res.json())
          .then((res) => {
            hideLoader()
            if(res.success){
               setCategoryList(res.payload.Category)
            } 
          })
          .catch((err) => {
            hideLoader()
            console.log(err)
          });
      },[])





    return (
        <div className="col-12">
                <div className="card">
                    <h5>Product List</h5>
                    <DataTable value={categoryList} paginator showGridlines className="p-datatable-gridlines" rows={10} scrollable  dataKey="id">
                        <Column field="createdAt" header="Date Created" body={(rowData) => new Date(rowData.createdAt).toLocaleDateString('en-GB')} sortable />
                        <Column field="name" header="Category" />
                        <Column 
                            field="icon" 
                            header="Image"  
                            body={(data) => (
                                <img 
                                    src={`${process.env.NEXT_PUBLIC_API_URL+data.icon}`} 
                                    alt="Product" 
                                    className="shadow-2"
                                    loading="lazy" 
                                    width={100}
                                />
                            )}
                        />
                        <Column header="Action" frozen style={{ flexGrow: 1, flexBasis: '120px' }} className="font-bold" alignFrozen="right" body={(rowData)=> (
                            <div className="action-icons">
                            {/* Edit Button with Tooltip */}
                            <Link href={`/category/edit/${rowData.id}`}>
                                <Button 
                                    icon="pi pi-pencil" 
                                    className="p-button-rounded p-button-info p-mr-2" 
                                    id={`edit-btn-${rowData.id}`} 
                                    aria-label="Edit"
                                />
                                <Tooltip target={`#edit-btn-${rowData.id}`} content="Edit" position="top" />
                            </Link>

            
                            {/* Delete Button with Tooltip */}
                            <Button 
                                icon="pi pi-trash" 
                                className="p-button-rounded p-button-danger p-mr-2" 
                                id={`delete-btn-${rowData.id}`} 
                                aria-label="Delete"
                            />
                            <Tooltip target={`#delete-btn-${rowData.id}`} content="Delete" position="top" />
            
                            {/* Storm Button with Tooltip */}
                        </div>
                        )} />
                    </DataTable>
                </div>
            </div>
    );
};

export default CategoryPage;
