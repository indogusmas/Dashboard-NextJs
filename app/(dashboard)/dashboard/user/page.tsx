import BreadCrumb from '@/components/breadcrumbs';
import { UserClient } from '@/components/table/user-tables/client';
import { users } from '@/constants/data';
import { link } from 'fs'
import React from 'react'

const breadcrumbItems = [{ title: 'User', link: '/dahboard/user'}];
export default function page() {
  return (
    <>
      <div className='flex-1 space-y-4 p-4 pt-6 md:p-8'>
        <BreadCrumb items={breadcrumbItems}/>
        <UserClient data={users}/>
      </div>
    </>
  )
}
