/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';
import { useEffect } from 'react';
import customFetch from '@/fetch-wrapper';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);


    useEffect(() => {
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}admin/token`, {
          method: "GET",
          headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
            "Admin-Key": localStorage.getItem("adminKey")
          },
        })
          .then((res) => res.json())
          .catch((err) => console.log(err));
      }, []);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
                { label: 'Direct Sell', icon: 'pi pi-tags', to: '/direct-sale' }
            ]
        },
        {
            label: 'Products',
            items: [
                { label: 'Product List', icon: 'pi pi-fw pi-id-card', to: '/products/list' },
                { label: 'Add New Product', icon: 'pi pi-fw pi-check-square', to: '/products/add' },
                { label: 'Category List', icon: 'pi pi-fw pi-eye', to: '/category/list' },
                { label: 'Add Category', icon: 'pi pi-fw pi-globe', to: '/category/add' }
            ]
        },
        {
            label: 'Reports',
            items: [
                { label: 'Orders', icon: 'pi pi-fw pi-prime', to: '/orders' },
                { label: 'Sales', icon: 'pi pi-fw pi-desktop', to:'/sales'  }
            ]
        },
        
        {
            label: 'Settings',
            items: [
                { label: 'Delivery Charges', icon: 'pi pi-fw pi-prime', to: '/delivery' },
                { label: 'Cover Image', icon: 'pi pi-fw pi-prime', to: '/customization' }
            ]
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
