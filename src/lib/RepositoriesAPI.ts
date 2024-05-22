import { api } from './api';
import { useQuery } from '@tanstack/react-query';
import Pagination from '@/types/Pagination';
import { RepositoryPaginatedData } from '@/types/Repository';

export const getRepositoriesList = async (
  params: Pagination
): Promise<RepositoryPaginatedData> => {
  const { data } = await api.get<RepositoryPaginatedData>(`/api/auth/repositories`, {
    params: params,
  });
  return data;
};


/* HOOKS */
export const useGetRepositoriesList = (params: Pagination) =>
  useQuery({
    queryKey: ['repositories', params],
    queryFn: async (): Promise<RepositoryPaginatedData> => {
      return await getRepositoriesList(params);
    },
  });
