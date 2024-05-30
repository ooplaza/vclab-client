import { api } from './api';
import { useQuery, useMutation } from '@tanstack/react-query';
import Pagination from '@/types/Pagination';
import { Repository, RepositoryPaginatedData } from '@/types/Repository';
import { RepositoryInput } from '@/components/AppRepositoryForm';
import Response from '@/types/Response';
import { toast } from '@/components/ui/use-toast';

export const getRepositoriesList = async (params: Pagination): Promise<RepositoryPaginatedData> => {
  const { data } = await api.get<RepositoryPaginatedData>(`/api/auth/repositories`, {
    params: params,
  });
  return data;
};

export const createRepository = async (repositoryData: RepositoryInput): Promise<Response> => {
  const { data } = await api.post<Response>(`/api/auth/repositories`, repositoryData);
  return data;
};

export const updateRepository = async (id: string, repositoryData: RepositoryInput): Promise<Response> => {
  const { data } = await api.patch<Response>(`/api/auth/repositories/${id}`, repositoryData);
  return data;
};

export const deleteRepository = async (id: string): Promise<Response> => {
  const response = await api.delete(`/api/auth/repositories/${id}`);
  return response.data;
};

export const useGetRepositoriesList = (params: Pagination) =>
  useQuery({
    queryKey: ['repositories', params],
    queryFn: async (): Promise<RepositoryPaginatedData> => {
      return await getRepositoriesList(params);
    },
  });

export const useCreateRepository = () => {
  return useMutation({
    mutationFn: async (repositoryData: RepositoryInput) => {
      return await createRepository(repositoryData);
    },
    onSuccess: (response) => {
      if (response.status === true)
        toast({
          variant: 'success',
          description: response.message,
        });
    },
  });
};

export const useUpdateRepository = () => {
  return useMutation({
    mutationFn: async ({ id, repositoryData }: { id: string; repositoryData: RepositoryInput }) => {
      return await updateRepository(id, repositoryData);
    },
    onSuccess: (response) => {
      if (response && response.status === true) {
        toast({
          variant: 'success',
          description: response.message,
        });
      }
    },
  });
};

export const useDeleteRepository = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteRepository(id);
    },
    onSuccess: (response) => {
      if (response && response.status === true) {
        toast({
          variant: 'success',
          description: response.message,
        });
      }
    },
  });
};
