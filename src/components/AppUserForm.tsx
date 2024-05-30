import React, { FC, useEffect } from 'react';
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
});

export type UserInput = z.infer<typeof userSchema>;

interface AppUserFormProps {
    data?: User;
    isOpen: boolean;
    onClose: () => void;
    queryClient: any;
}

const AppUserForm: FC<AppUserFormProps> = ({ data, isOpen, onClose, queryClient }) => {
    const form = useForm<UserInput>({
        resolver: zodResolver(userSchema),
        defaultValues: data ? {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
        } : undefined,
    });

    useEffect(() => {
        if (data) {
            form.reset({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
            });
        }
    }, [data, form]);

    const { mutate: createUser, isPending: isCreating } = useCreateUser();
    const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

    const onSubmit = (formData: UserInput) => {
        console.log("formData"), formData
        // if (data && data.id) {
        //     useUpdateUser({ id: data.id, userData: formData }, {
        //         onSuccess: (response) => {
        //             console.log('response', response);
        //         },
        //         onSettled: () => {
        //             onClose();
        //             queryClient.invalidateQueries({
        //                 queryKey: ['users'],
        //             });
        //         },
        //     });
        // } else {
        //     useCreateUser(formData, {
        //         onSuccess: (response) => {
        //             console.log('response', response);
        //         },
        //         onSettled: () => {
        //             onClose();
        //             queryClient.invalidateQueries({
        //                 queryKey: ['users'],
        //             });
        //         },
        //     });
        // }
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

                        <div className='mt-5 flex space-x-2'>
                            <Button variant="outline" onClick={onClose}>Close</Button>
                            <Button type="submit" variant="default" className="text-white" disabled={isCreating || isUpdating}>
                                {data ? 'Save' : 'Add'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AppUserForm;
