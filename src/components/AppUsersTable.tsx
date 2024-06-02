'use client';
import React, { useState, useEffect, useMemo } from 'react';
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
import { ArrowUpDown, Edit, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useUserList, useDeleteUser } from '@/lib/UsersAPI';
import User from '@/types/User';
import AppUserForm from './AppUserForm';
import AppConfirmationDialog from './AppConfirmationDialog';
import { useQueryClient } from '@tanstack/react-query';
import debounce from 'lodash.debounce';


export default function AppUsersTable() {
    const queryClient = useQueryClient();
    const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
    const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);
    const [isSearching, setIsSearching] = useState(false);

    const { data, isLoading } = useUserList({
        offset: pageIndex
    });

    const { mutate } = useDeleteUser();

    const debouncedSearch = useMemo(() =>
        debounce((keyword) => {
            setIsSearching(false);
            setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
        }, 1000), []
    );

    useEffect(() => {
        setIsSearching(true);
        debouncedSearch(searchKeyword);
    }, [searchKeyword, debouncedSearch]);

    const handleDelete = (id: string) => {
        mutate(id.toString(), {
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: ['users']
                });
            }
        });
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsEditUserDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setIsEditUserDialogOpen(false);
        setSelectedUser(null);
    };

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
                        {!isLoading && !isSearching && (
                            <>
                                <Button variant="secondary" type='button' onClick={() => handleEdit(item)}>
                                    <Edit size={20} />
                                </Button>
                                <AppConfirmationDialog
                                    title='Delete User'
                                    description={`Are you sure you want to delete the user "${item.first_name} ${item.last_name}"? This action cannot be undone.`}
                                    buttonElem={
                                        <Button className="text-white" variant="destructive" type='button'>
                                            <Trash size={20} />
                                        </Button>
                                    }
                                    handleDialogAction={() => handleDelete(item.id!)}
                                />
                            </>
                        )}
                    </div>
                );
            },
            enableSorting: false,
            enableHiding: false,
        },

    ];

    const filteredData = useMemo(() => {
        if (data) {
            return data.results.filter((item: User) =>
                `${item.first_name} ${item.last_name}`.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                item.email.toLowerCase().includes(searchKeyword.toLowerCase())
            );
        }
        return [];
    }, [data, searchKeyword]);


    const pagination = React.useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    );

    const table = useReactTable({
        data: isLoading || isSearching ? Array(10).fill({}) : filteredData,
        columns: (isLoading || isSearching)
            ? columns.map((column) => ({
                ...column,
                cell: () => <Skeleton className='h-12 w-full' />,
            }))
            : columns, 
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
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


    return (
        <div>
            <div className="flex justify-between mt-5">
                <div>
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="Search..."
                        className="border border-gray-300 px-3 py-2 rounded-md mr-4"
                    />
                </div>
                <div>
                    <Button variant="default" className="text-white" onClick={() => { setIsAddUserDialogOpen(true) }}>Add User</Button>
                    {
                        isAddUserDialogOpen && (
                            <AppUserForm
                                onClose={() => setIsAddUserDialogOpen(false)}
                                isOpen={isAddUserDialogOpen}
                                queryClient={queryClient}
                            />
                        )
                    }

                    {
                        isEditUserDialogOpen && selectedUser && (
                            <AppUserForm
                                onClose={handleCloseEditDialog}
                                isOpen={isEditUserDialogOpen}
                                queryClient={queryClient}
                                data={selectedUser}
                            />
                        )
                    }
                </div>
            </div>
            <AppTable table={table} />
        </div>
    );
}