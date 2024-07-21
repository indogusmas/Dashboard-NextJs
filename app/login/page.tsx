"use client";

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function page() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  
  const [loading,setLoading] = useState(false);
  const [open,setOpen] = useState(false);
  const [message,setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan email dan password
    console.log({ email, password });

    const res = await fetch('api/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email,password})
    });

    const data = await res.json();

    if (res.status === 200) {
      router.push('/dashboard');
    }else{
      setMessage('Failed Login');
      setOpen(true);
    }
  };

  return (
    <>
    <AlertModal
    title='Warning'
    description={message}
    isOpen={open}
    onClose={() => setOpen(false)}
    onConfirm={() => setOpen(false)}
    loading
    />
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="w-full text-2xl text-center font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
               type="email"
               id="email"
               autoComplete="off"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
               />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" 
              id="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"/>
          </div>
          <Button
            type="submit"
            className="w-full"
            >Login
          </Button>
        </form>
      </div>
    </div>
    </>
  )
}
