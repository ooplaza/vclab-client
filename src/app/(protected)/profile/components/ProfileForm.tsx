'use client';
import React, { FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { strings } from '@/utils/strings';
import { useUpdateUser } from '@/lib/UsersAPI';
import User from '@/types/User';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import AppSpinner from '@/components/AppSpinner';

const inputSchema = z
  .object({
    first_name: z
      .string({
        required_error: strings.validation.required,
      })
      .min(1, {
        message: strings.validation.required,
      }),
    last_name: z
      .string({
        required_error: strings.validation.required,
      })
      .min(1, {
        message: strings.validation.required,
      }),
    email: z
      .string({
        required_error: strings.validation.required,
      })
      .email()
      .min(1, {
        message: strings.validation.required,
      }),
    current_password: z
      .string()
      .nullish()
      .transform((v) => v ?? ''),
    new_password: z
      .string()
      .nullish()
      .transform((v) => v ?? ''),
  })
  .refine(
    (data) =>
      data.current_password.length <= 0 && data.new_password.length > 0
        ? false
        : true,
    {
      message: 'Please fill out the current password field',
      path: ['current_password'],
    }
  )
  .refine(
    (data) => {
      console.log(
        'data.current_password: ',
        data.current_password.length > 0,
        'data.new_password: ',
        data.new_password.length <= 0,
        data.current_password.length > 0 && data.new_password.length <= 0
          ? false
          : true
      );
      return data.current_password.length > 0 && data.new_password.length <= 0
        ? false
        : true;
    },
    {
      message: 'Please fill out the new password field',
      path: ['new_password'],
    }
  );
export type ProfileFormInputs = z.infer<typeof inputSchema>;

const ProfileForm: FC<{ user: User }> = ({ user }) => {
  const form = useForm<ProfileFormInputs>({
    reValidateMode: 'onChange',
    resolver: zodResolver(inputSchema),
    defaultValues: {
      ...user,
    },
  });

  const [open, setOpen] = useState(false);

  const { mutate, status } = useUpdateUser();

  const onSubmit = (inputs: ProfileFormInputs) => {
    if (user.id) {
      mutate({
        id: user.id,
        userData: inputs,
      });
    }
  };

  return (
    <>
      <Card className='mt-5 p-10'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              setOpen(true);
            })}
          >
            <CardContent className='py-10'>
              <div className='grid gap-x-10 gap-y-5 sm:grid-cols-2'>
                <div className='grid gap-x-10 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='first_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            type='text'
                            {...field}
                            className='border-primary focus-visible:ring-offset-0'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='last_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            type='text'
                            {...field}
                            className='border-primary focus-visible:ring-offset-0'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          {...field}
                          className='border-primary focus-visible:ring-offset-0'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='current_password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          {...field}
                          className='border-primary focus-visible:ring-offset-0'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='new_password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          {...field}
                          className='border-primary focus-visible:ring-offset-0'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='mt-16 text-right'>
                <Button type="submit" className='w-full px-20 sm:w-auto'>
                  Save
                </Button>
              </div>
            </CardContent>
          </form>
        </Form>
      </Card>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to update your profile?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out after this action
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={() => form.handleSubmit(onSubmit)()}>
              {/* {isLoading ? <AppSpinner className='mx-auto' /> : 'Continue'} */}
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProfileForm;
