import { ProfileFormInputs } from '@/app/(protected)/profile/components/ProfileForm';
import { toast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';
import Response from '@/types/Response';
import User, { UserPaginatedData } from '@/types/User';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLogout } from './AuthenticationAPI';

export const getUsers = async (
  page: number = 1,
  pageSize: number = 10,
  filter = '',
  sortColumn = '',
  sortDesc = false
): Promise<User[]> => {
  const { data } = await api.get<UserPaginatedData>(`/api/auth/users`, {
    params: {
      page,
      ...(pageSize && { page_size: pageSize }),
      ...(filter && { filter }),
      ...(sortColumn && { sort_column: sortColumn }),
      sort_desc: sortDesc,
    },
  });

  return data.results;
};



export const updateUser = async (
  id: string,
  params: ProfileFormInputs
): Promise<Response> => {
  const fd = new FormData();
  fd.append('_method', 'put');
  for (const item in params) {
    fd.append(item, params[item as keyof ProfileFormInputs]);
  }
  const { data } = await api.post<Response>(`/api/users/${id}`, fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const deleteUser = async (id: string): Promise<Response> => {
  const { data } = await api.delete<Response>(`/api/users/${id}`);
  return data;
};

/* HOOKS */

export const useUsers = (
  page: number = 1,
  pageSize: number = 10,
  globalFilter = '',
  sortColumn = '',
  sortDesc = false
) =>
  useQuery({
    queryKey: ['users', page, pageSize, globalFilter, sortColumn, sortDesc],
    queryFn: async (): Promise<UserPaginatedData> => {
      const users = await getUsers(page, pageSize, globalFilter, sortColumn, sortDesc);
      return { results: users, last_page: 1 };
    },
  });


export const useUpdateUser = () => {
  const { mutate: logout } = useLogout();

  return useMutation({
    mutationFn: async ({
      id,
      params,
    }: {
      id: string;
      params: ProfileFormInputs;
    }) => {
      return await updateUser(id, params);
    },
    onSuccess: async (response) => {
      logout();

      // SHOW MESSAGE
      toast({
        variant: 'success',
        description: response.message,
      });
    },
  });
};

/* END HOOKS */
