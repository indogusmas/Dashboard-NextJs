import Header from '@/components/layout/header'
import SideBar from '@/components/layout/sidebar'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Next Js Dashboard',
  description: 'Dashboard'
}

export default function layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header/>
      <div className="flex h-screen overflow-hidden">
        <SideBar />
        <main className="flex-1 overflow-hidden pt-16">{children}</main>
      </div>
    </>
  )
}
