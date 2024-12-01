/* eslint-disable @next/next/no-img-element */
"use client"
import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useEffect, useState } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import customFetch from '@/fetch-wrapper';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    

    const [siteIconPreview, setSiteIconPreview] = useState('')
    const [siteTitle, setSiteTitle] = useState('')
    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    useEffect(()=> {
        customFetch(`${process.env.NEXT_PUBLIC_API_URL}siteinfo`,{
            method: 'GET',
                headers: {
                  Authorization: localStorage.getItem('atoken'), // Correctly set the Content-Type
                  'Admin-Key': localStorage.getItem('adminKey')
            }
        })
        .then(res=> res.json())
        .then(res=> {
            if(res.success && res.payload.SiteInfo.length > 0){
                setSiteIconPreview(res.payload.SiteInfo[0].siteIcon)
                setSiteTitle(res.payload.SiteInfo[0].siteTitle)
            }
        })
        .catch((err) => console.log(err));
    },[])
    

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                {siteIconPreview ?
                <>
                  <img src={`${process.env.NEXT_PUBLIC_API_URL+siteIconPreview}`} width="47.22px" height={'35px'} alt="logo" />
                  <span>{siteTitle}</span>
                </> : 
                <>
                  <img src={`/layout/images/logo.png`} width="47.22px" height={'35px'} alt="logo" />
                  <span>NEXT SOLUTIONS</span>
                </>}
                
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>
                <Link href="/documentation">
                    <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-cog"></i>
                        <span>Settings</span>
                    </button>
                </Link>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
