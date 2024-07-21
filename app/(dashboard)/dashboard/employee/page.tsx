import BreadCrumb from '@/components/breadcrumbs';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Employee } from "@/constants/data";
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';


const breadcrumbItems = [{title: 'Employee',link: '/dashboard/employee'}];

type paramProps = {
  searchParams: {
    [key: string] : string | string[] | undefined;
  }
}

export default async function page({searchParams}: paramProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
      (country ? `&search=${country}` : '')
  );

  const employeeRes = await res.json();
  const totalusers = employeeRes.total_users;
  const pageCount = Math.ceil(totalusers / pageLimit);
  const employee: Employee[] = employeeRes.users;

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems}/>
        <div className='flex items-start justify-between'>
          <Heading
            title={`Employee `}
            description="Manage Emoloyee (Server side table functional.)"/>
          <Link
            href={'/dashboard/employee/new'}
            className={cn(
              buttonVariants({variant: 'default'})
            )}
          >
            <Plus className="mr-2 h-4 w-4"/> Add New
          </Link>
        </div>
        <Separator/>
      </div>
    </>
  )
}