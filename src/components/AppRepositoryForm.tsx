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
import { useCreateRepository, useUpdateRepository } from '@/lib/RepositoriesAPI';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { strings } from '@/utils/strings';
import { Repository } from '@/types/Repository';

const repositorySchema = z.object({
    title: z.string().min(3, {
        message: strings.validation.required,
    }),
    category: z.string().min(3, {
        message: strings.validation.required,
    }),
    author: z.string().min(3, {
        message: strings.validation.required,
    }),
    description: z.string().min(3, {
        message: strings.validation.required,
    }),
    link: z.string().url('Invalid URL'),
    is_public: z.boolean().optional(),
});

export type RepositoryInput = z.infer<typeof repositorySchema>;

interface AppRepositoryFormProps {
    data?: Repository;
    isOpen: boolean;
    onClose: () => void;
    queryClient: any;
}

const AppRepositoryForm: FC<AppRepositoryFormProps> = ({ data, isOpen, onClose, queryClient }) => {
    const form = useForm<RepositoryInput>({
        resolver: zodResolver(repositorySchema),
        defaultValues: data ? {
            title: data.title,
            category: typeof data.category === 'string' ? data.category : data.category?.name || '',
            author: data.author,
            description: data.description,
            link: data.link,
            is_public: typeof data.is_public === 'boolean' ? data.is_public : data.is_public === 'true',
        } : undefined,
    });

    useEffect(() => {
        if (data) {
            form.reset({
                title: data.title,
                category: typeof data.category === 'string' ? data.category : data.category?.name || '',
                author: data.author,
                description: data.description,
                link: data.link,
                is_public: typeof data.is_public === 'boolean' ? data.is_public : data.is_public === 'true',
            });
        }
    }, [data, form]);

    const { mutate: createRepository, isPending: isCreating } = useCreateRepository();
    const { mutate: updateRepository, isPending: isUpdating } = useUpdateRepository();

    const onSubmit = (formData: RepositoryInput) => {
        if (data && data.id) {
            updateRepository({ id: data.id, repositoryData: formData }, {
                onSuccess: (response) => {
                    console.log('response', response);
                },
                onSettled: () => {
                    onClose();
                    queryClient.invalidateQueries({
                        queryKey: ['repositories'],
                    });
                },
            });
        } else {
            createRepository(formData, {
                onSuccess: (response) => {
                    console.log('response', response);
                },
                onSettled: () => {
                    onClose();
                    queryClient.invalidateQueries({
                        queryKey: ['repositories'],
                    });
                },
            });
        }
    };

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{data ? 'Edit Repository' : 'Add Repository'}</AlertDialogTitle>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem className="mb-3">
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} className="w-full h-24 shadow-sm rounded-md p-2" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='category'
                            render={({ field }) => (
                                <FormItem className="mb-3">
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='author'
                            render={({ field }) => (
                                <FormItem className="mb-3">
                                    <FormLabel>Author</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem className="mb-3">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} className="w-full h-24 shadow-sm rounded-md p-2" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='link'
                            render={({ field }) => (
                                <FormItem className="mb-5">
                                    <FormLabel>Link</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} className="w-full h-24 shadow-sm rounded-md p-2" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='is_public'
                            render={({ field }) => (
                                <FormItem className="mb-5">
                                    <FormControl>
                                        <Switch id="is_public" onCheckedChange={field.onChange} checked={field.value} />
                                    </FormControl>
                                    <FormLabel>Make Repository Public</FormLabel>
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

export default AppRepositoryForm;
