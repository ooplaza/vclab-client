import React, { FC, useEffect, useState } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    Form, FormControl, FormField, FormItem, FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateUser, useUpdateUser } from '@/lib/UsersAPI';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { strings } from '@/utils/strings';
import User from "@/types/User"
import AppSpinner from './AppSpinner';
import { QueryClient } from '@tanstack/react-query';

const userSchema = z.object({
    first_name: z.string().min(3, {
        message: strings.validation.required,
    }),
    last_name: z.string().min(3, {
        message: strings.validation.required,
    }),
    email: z.string().min(3, {
        message: strings.validation.required,
    }).email(),
    password: z.string().optional(),
    is_superuser: z.boolean().optional(),
    is_active: z.boolean().optional(),
});

export type UserInput = z.infer<typeof userSchema>;

interface AppUserFormProps {
    data?: User;
    isOpen: boolean;
    onClose: () => void;
    queryClient: QueryClient;
}

const defaultPassword = 'Password@123';

const AppUserForm: FC<AppUserFormProps> = ({ data, isOpen, onClose, queryClient }) => {

    const [loading, setLoading] = useState(false)

    const form = useForm<UserInput>({
        resolver: zodResolver(userSchema),
        defaultValues: data ? {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            is_superuser: typeof data.is_superuser === 'boolean' ? data.is_superuser : data.is_superuser === 'true',
        } : {
            first_name: '',
            last_name: '',
            email: '',
            is_superuser: false,
            password: defaultPassword,
            is_active: true,
        },
    });

    useEffect(() => {
        if (data) {
            form.reset({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                is_superuser: typeof data.is_superuser === 'boolean' ? data.is_superuser : data.is_superuser === 'true',
            });
        }
    }, [data, form]);

    const { mutate: createUser, isPending: isCreating } = useCreateUser();
    const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

    const onSubmit = async (formData: UserInput) => {
        setLoading(true);
        if (data && data.id) {
            await updateUser({ id: data.id, userData: formData }, {
                onSuccess: (response) => {
                    console.log('response', response);
                },
                onSettled: () => {
                    onClose();
                    queryClient.invalidateQueries({
                        queryKey: ['users'],
                    });
                },
            });
        } else {
            await createUser(formData, {
                onSuccess: (response) => {
                    console.log('response', response);
                },
                onSettled: () => {
                    onClose();
                    queryClient.invalidateQueries({
                        queryKey: ['users'],
                    });
                },
            });
        }
        setLoading(false);
    };

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{data ? 'Edit User' : 'Add User'}</AlertDialogTitle>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField
                            control={form.control}
                            name='first_name'
                            render={({ field }) => (
                                <FormItem className="mb-3">
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='last_name'
                            render={({ field }) => (
                                <FormItem className="mb-3">
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem className="mb-5">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='is_superuser'
                            render={({ field }) => (
                                <FormItem className="mb-5 flex items-center">
                                    <FormControl>
                                        <Switch id="is_superuser" onCheckedChange={field.onChange} checked={field.value} />
                                    </FormControl>
                                    <div className="flex items-center ml-2">
                                        <FormLabel className="mr-2">Super User</FormLabel>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <div className='mt-5 flex space-x-2'>
                            <Button variant="outline" onClick={onClose}>Close</Button>
                            <Button type="submit" variant="default" className="text-white" disabled={isCreating || isUpdating}>
                                {loading ? <AppSpinner /> : (data ? 'Save' : 'Add')}
                            </Button>
                        </div>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AppUserForm;
