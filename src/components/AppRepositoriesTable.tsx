'use client';
import React, { useState, useEffect } from 'react';
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
import { Repository } from '@/types/Repository';
import { useDeleteRepository, useGetRepositoriesList } from '@/lib/RepositoriesAPI';
import AppRepositoryForm from './AppRepositoryForm';
import AppConfirmationDialog from './AppConfirmationDialog';
import { useQueryClient } from '@tanstack/react-query';

export default function AppRepositoriesTable() {
  const queryClient = useQueryClient();
  const [isAddRepositoryDialogOpen, setIsAddRepositoryDialogOpen] = useState(false);
  const [isEditRepositoryDialogOpen, setIsEditRepositoryDialogOpen] = useState(false);
  const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const { data, isLoading } = useGetRepositoriesList({
    offset: pageIndex
  });

  const { mutate } = useDeleteRepository();

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
      }, 1000)
    );

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchKeyword]);

  const handleDelete = (id: string) => {
    mutate(id.toString(), {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['repositories']
        });
      }
    });
  };

  const handleEdit = (repository: Repository) => {
    setSelectedRepository(repository);
    setIsEditRepositoryDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditRepositoryDialogOpen(false);
    setSelectedRepository(null);
  };

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
        let categoryName: string;

        if (typeof item.category === 'string') {
          categoryName = item.category;
        } else {
          categoryName = item.category?.name || 'Unknown';
        }

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
        const [isExpanded, setIsExpanded] = useState(false);
        const description = isExpanded ? item.description : item.description.slice(0, 50) + (item.description.length > 50 ? '...' : '');
        return (
          <div>
            {description}
            {item.description.length > 50 && (
              <Button variant="link" className="pl-2" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'See Less' : 'See More'}
              </Button>
            )}
          </div>
        );
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
          <a href={item.link} className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
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
            <Button variant="secondary" type='button' onClick={() => handleEdit(item)}>
              <Edit size={20} />
            </Button>
            <AppConfirmationDialog
              title='Delete Repository'
              description={`Are you sure you want to delete the repository "${item.title}"? This action cannot be undone.`}
              buttonElem={
                <Button className="text-white" variant="destructive" type='button'>
                  <Trash size={20} />
                </Button>
              }
              handleDialogAction={() => handleDelete(item.id!)}
            />
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
    pageCount: data?.count ?? -1,
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
          <Button variant="default" className="text-white" onClick={() => { setIsAddRepositoryDialogOpen(true) }}>Add Repository</Button>
          {
            isAddRepositoryDialogOpen && (
              <AppRepositoryForm
                onClose={() => setIsAddRepositoryDialogOpen(false)}
                isOpen={isAddRepositoryDialogOpen}
                queryClient={queryClient}
              />
            )
          }

          {
            isEditRepositoryDialogOpen && selectedRepository && (
              <AppRepositoryForm
                onClose={handleCloseEditDialog}
                isOpen={isEditRepositoryDialogOpen}
                queryClient={queryClient}
                data={selectedRepository}
              />
            )
          }
        </div>
      </div>
      <AppTable table={table} />
    </div>
  );
}