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
import { ArrowUpDown, Eye, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useUsers } from '@/lib/UsersAPI';
import User from '@/types/User';

export default function AppUsersTable() {
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);

    const { data, isLoading } = useUsers(pageIndex + 1, pageSize, searchKeyword, sorting);

    const [rowSelection, setRowSelection] = useState({});
    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'first_name',
            header: ({ column }) => (
                <Button
                    variant='ghost'
                    className='pl-0 text-left hover:!bg-transparent'
                    onClick={() => column.toggleSorting()}
                >
                    Name
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            ),
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div>
                        {item.first_name} {item.last_name}
                    </div>
                );
            },
            enableSorting: true,
        },
        {
            accessorKey: 'email',
            header: ({ column }) => (
                <Button
                    variant='ghost'
                    className='pl-0 text-left hover:!bg-transparent'
                    onClick={() => column.toggleSorting()}
                >
                    Email
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            ),
            cell: ({ row }) => {
                const item = row.original;
                return <div>{item.email}</div>;
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
                        <Button variant="secondary" type='button' onClick={() => console.log('View clicked')}>
                            <Eye size={20} />
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
        data: data?.results ?? [],
        columns: isLoading
            ? columns.map((column) => ({
                ...column,
                cell: () => <Skeleton className='h-12 w-full' />,
            }))
            : columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
        onGlobalFilterChange: setSearchKeyword,
        pageCount: data?.results?.length ?? -1,
        manualPagination: true,
        manualFiltering: true,
        manualSorting: true,
        state: {
            sorting,
            pagination,
            globalFilter: searchKeyword,
        },
    });

    return <AppTable table={table} />;
}
