import { api } from './api';
import { useQuery, useMutation } from '@tanstack/react-query';
import Pagination from '@/types/Pagination';
import { UserPaginatedData } from '@/types/User';
import { UserInput } from '@/components/AppUserForm';
import Response from '@/types/Response';
import { toast } from '@/components/ui/use-toast';

export const getUserList = async (params: Pagination): Promise<UserPaginatedData> => {
  const { data } = await api.get<UserPaginatedData>(`/api/auth/users`, {
    params: params,
  });
  return data;
};

export const createUser = async (inputs: UserInput): Promise<Response> => {
  const { data } = await api.post<Response>(`/api/auth/users`, inputs);
  return data;
};

export const updateUser = async (id: string, inputs: UserInput): Promise<Response> => {
  const { data } = await api.patch<Response>(`/api/auth/users/${id}`, inputs);
  return data;
};

export const deleteUser = async (id: string): Promise<Response> => {
  const response = await api.delete(`/api/auth/users/${id}`);
  return response.data;
};

export const useUserList = (params: Pagination) =>
  useQuery({
    queryKey: ['users', params],
    queryFn: async (): Promise<UserPaginatedData> => {
      return await getUserList(params);
    },
  });

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (inputs: UserInput) => {
      return await createUser(inputs);
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

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async ({ id, userData }: { id: string; userData: UserInput }) => {
      return await updateUser(id, userData);
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

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteUser(id);
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
