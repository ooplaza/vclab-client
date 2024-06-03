
import { api } from './api';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import Response from '@/types/Response';
import { ContactInput } from '@/app/contact/page';

export const sendEmail = async (contactData: ContactInput): Promise<Response> => {
    const { data } = await api.post<Response>('/api/send-email', contactData);
    return data;
};

export const useSendEmail = () => {
    return useMutation({
        mutationFn: async (contactData: ContactInput) => {
            return await sendEmail(contactData);
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
