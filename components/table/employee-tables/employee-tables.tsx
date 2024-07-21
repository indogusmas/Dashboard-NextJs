'use client'

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, PaginationState, useReactTable } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface DataTableProps<TData, TValue> {
  colums: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  pageNo: number;
  totalUsers: number;
  pageSizeOptions?: number[];
  pageCount: number;
  searchParams?: {
    [key: string] : string | string[] | undefined;
  }
}

export function EmployeeTable<TData, TValue>({
  data,
  columns,
  pageNo,
  searchKey,
  totalUsers,
  pageCount,
  pageSizeOptions = [10,20,30,40,50]
}): DataTableProps<TData,TValue> {
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') ?? '1';
  const pageAsNumber = Number(page);
  const fallbackPage = 
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  const per_page = searchParams?.get('limit') ?? '10';
  const perPageAsNumber = Number(per_page);
  const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSeacrhParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSeacrhParams.delete(key);
        }else {
          newSeacrhParams.set(key,String(value));
        }
      }

      return newSeacrhParams.toString();
    },
    [searchParams]
  );

  const [{ pageIndex, pageSize }, setPagination ] = 
    React.useState<PaginationState>({
      pageIndex: fallbackPage -1,
      pageSize: fallbackPage
    });

    React.useEffect(() => {
      router.push(
        `${pathname}?${createQueryString({
          page: pageIndex + 1,
          limit: pageSize
        })}`,
        {
          scroll: false
        }
      );
    },[pageIndex,pageSize]);

    const table = useReactTable({
      data,
      columns,
      pageCount: pageCount ?? -1,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        pagination: {pageIndex, pageSize}
      },
      onPaginationChange: setPagination,
      getPaginationRowModel: getPaginationRowModel(),
      manualPagination: true,
      manualFiltering: true
    });

    const searchValue = table.getColumn(searchKey)?.getFilterValue() as string;
    React.useEffect(() => {
      if (searchValue?.length > 0) {
        router.push(
          `${pathname}?${createQueryString({
            page: null,
            limit: null,
            search: searchValue
          })}`,
          {
            scroll: false
          }
        )
      }
      if (searchValue?.length === 0 || searchValue === undefined) {
        router.push(
          `${pathname}?${createQueryString({
            page: null,
            limit: null,
            search: null
          })}`,
          {
            scroll: false
          }
        )
      }

      setPagination((prev) => ({ ...prev, pageIndex: 0}));
    }, [searchValue]);

  return (
    <>
      <Input
        placeholder={`Search ${searchKey}...`}
        value={(table.getColumn(searchKey)?.getFilterValue() as string ) ?? ''}
        onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
        className="w-full md:max-w-sm"
      />
      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">

      </ScrollArea>
    </>
  );
}