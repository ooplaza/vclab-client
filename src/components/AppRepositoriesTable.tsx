'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
  ColumnDef,
  PaginationState,
  SortingState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import AppTable from '@/components/AppTable';
import { Edit, Trash } from 'lucide-react';
import { Repository } from '@/types/Repository';
import { useDeleteRepository, useGetRepositoriesList } from '@/lib/RepositoriesAPI';
import AppRepositoryForm from './AppRepositoryForm';
import AppConfirmationDialog from './AppConfirmationDialog';
import { useQueryClient } from '@tanstack/react-query';
import debounce from 'lodash.debounce';

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
  const [isSearching, setIsSearching] = useState(false);

  const { data, isLoading } = useGetRepositoriesList({
    offset: pageIndex
  });

  const { mutate } = useDeleteRepository();

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <a
                  href={item.link}
                  className="text-blue-600 hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click Here
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.link}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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

  const filteredData = useMemo(() => {
    if (data) {
      return data.results.filter((item: Repository) =>
        item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        (typeof item.category === 'string' ? item.category.toLowerCase().includes(searchKeyword.toLowerCase()) : item.category?.name.toLowerCase().includes(searchKeyword.toLowerCase())) ||
        item.author.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.link.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    return [];
  }, [data, searchKeyword]);

  const pagination = useMemo(
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
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    pageCount: data?.count ?? -1,
    manualPagination: true,
    manualSorting: true,
    state: {
      sorting,
      rowSelection,
      pagination,
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
