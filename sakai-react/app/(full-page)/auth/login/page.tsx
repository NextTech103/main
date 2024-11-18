/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState, useRef } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useLoading } from '../../../../layout/context/LoadingContext';
import { Toast } from 'primereact/toast';


const LoginPage = () => {
    const toast = useRef<Toast>(null);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState("");
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const { showLoader, hideLoader } = useLoading();
    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    
    function submitHandle() {
        if (email == "") {
            toast.current?.show({
                severity: 'warn',
                summary: 'Warning Message',
                detail: 'Email is required',
                life: 3000
            });
    
          return false;
        }
    
        if (password == "") {
          toast.current?.show({
            severity: 'warn',
            summary: 'Warning Message',
            detail: 'Password is required',
            life: 3000
        });
    
          return false;
        }
        const data = {
          'email' : email,
          'password' : password
        }
        
        showLoader()
        fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",  // Correctly set the Content-Type
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            hideLoader()
            if (!res.success) {
                toast.current?.show({
                    severity: 'warn',
                    summary: 'Warning Message',
                    detail: res.message,
                    life: 3000
                });
              return false;
            } else {
              localStorage.setItem("userInfo", JSON.stringify(res.payload.user))
              localStorage.setItem("atoken", res.payload.token);
              localStorage.setItem("adminKey", res.payload.adminKey)
              router.push('/')
            }
          })
          .catch((err) => {
            hideLoader()
          });
      }
    return (
        <div className={containerClassName}>
            <Toast ref={toast} />
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Welcome</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText id="email1" type="text" placeholder="Email address" onChange={(e)=> setEmail(e.target.value)} className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password type="password" inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                {/* <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Remember me</label>
                                </div> */}
                                {/* <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Forgot password?
                                </a> */}
                            </div>
                            <Button label="Sign In" className="w-full p-3 text-xl" onClick={() => submitHandle()}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
