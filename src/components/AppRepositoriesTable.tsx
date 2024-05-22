'use client';
import React, { useState } from 'react';
import {
  ColumnDef,
  PaginationState,
  SortingState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import AppTable from '@/components/AppTable';
import { Edit, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Repository } from '@/types/Repository';
import { useGetRepositoriesList } from '@/lib/RepositoriesAPI';

export default function AppRepositoriesTable() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isLoading } = useGetRepositoriesList({
    page: pageIndex + 1,
    pageSize: pageSize,
    search: searchKeyword,
    sortColumn: sorting.map((item) => item.id).join(','),
    sortDesc: Boolean(sorting.map((item) => item.desc).join(',')),
  });


  const [rowSelection, setRowSelection] = useState({});
  const columns: ColumnDef<Repository>[] = [
    {
      accessorKey: 'title',
      header: () => (
        <Button
          variant='ghost'
          className='pl-0 text-left hover:!bg-transparent'
        >
          Title
        </Button>
      ),
      cell: ({ row }) => {
        const item = row.original;
        return <div>{item.title}</div>;
      },
      enableSorting: true,
    },
    {
      accessorKey: 'category.name',
      header: () => (
        <Button
          variant='ghost'
          className='pl-0 text-left hover:!bg-transparent'
        >
          Category
        </Button>
      ),
      cell: ({ row }) => {
        const item = row.original;
        const categoryName = item.category ? item.category.name : 'Unknown';
        return <div>{categoryName}</div>;
      },
      enableSorting: true,
    },

    {
      accessorKey: 'author',
      header: () => (
        <Button
          variant='ghost'
          className='pl-0 text-left hover:!bg-transparent'
        >
          Author
        </Button>
      ),
      cell: ({ row }) => {
        const item = row.original;
        return <div>{item.author}</div>;
      },
      enableSorting: true,
    },
    {
      accessorKey: 'description',
      header: () => (
        <Button
          variant='ghost'
          className='pl-0 text-left hover:!bg-transparent'
        >
          Description
        </Button>
      ),
      cell: ({ row }) => {
        const item = row.original;
        return <div>{item.description}</div>;
      },
      enableSorting: true,
    },
    {
      accessorKey: 'link',
      header: () => (
        <Button
          variant='ghost'
          className='pl-0 text-left hover:!bg-transparent'
        >
          Link
        </Button>
      ),
      cell: ({ row }) => {
        const item = row.original;
        return (
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            {item.link}
          </a>
        );
      },
      enableSorting: true,
    },
    {
      id: 'actions',
      header: () => <div className='text-center'>Actions</div>,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex justify-center space-x-4">
            <Button variant="secondary" type='button' onClick={() => console.log('Edit clicked')}>
              <Edit size={20} />
            </Button>
            <Button variant="destructive" type='button' onClick={() => console.log('Delete clicked')}>
              <Trash size={20} />
            </Button>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },

  ];


  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: data ? data.results : Array(10).fill({}),
    columns: isLoading
      ? columns.map((column) => ({
        ...column,
        cell: () => <Skeleton className='h-12 w-full' />,
      }))
      : columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setSearchKeyword,
    pageCount: data?.last_page ?? -1,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    state: {
      sorting,
      rowSelection,
      pagination,
      globalFilter: searchKeyword,
    },
  });

  return <AppTable table={table} />;
}
