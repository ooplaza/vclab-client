'use client';
import React, { FC } from 'react';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useRegister } from '@/lib/AuthenticationAPI';
import AppSpinner from '@/components/AppSpinner';
import { strings } from '@/utils/strings';
import { useRouter } from 'next/navigation';

const inputSchema = z.object({
  first_name: z.string({
    required_error: strings.validation.required,
  }).min(3, strings.validation.required),
  last_name: z.string({
    required_error: strings.validation.required,
  }).min(3, strings.validation.required),
  email: z.string({
    required_error: strings.validation.required,
  }).email(),
  password: z.string({
    required_error: strings.validation.required,
    invalid_type_error: strings.validation.required,
  }).min(8, {
    message: strings.validation.password_min_characters,
  }).regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  }).regex(/\d/, {
    message: "Password must contain at least one digit.",
  }).regex(/[!@#$%^&_*()]/, {
    message: "Password must contain at least one special character (!@#$%^&_*()).",
  }).optional().default(''),
  password_confirmation: z.string({
    required_error: strings.validation.required,
    invalid_type_error: strings.validation.required,
  }).min(8, {
    message: strings.validation.password_min_characters,
  }).regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  }).regex(/\d/, {
    message: "Password must contain at least one digit.",
  }).regex(/[!@#$%^&_*()]/, {
    message: "Password must contain at least one special character (!@#$%^&_*()).",
  }).optional().default(''),
  is_active: z.boolean().optional().default(true),
  is_supervisor: z.boolean().optional().default(false),
}).refine(data => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
});

export type RegisterInputs = z.infer<typeof inputSchema>;

const RegisterForm: FC = () => {
  const router = useRouter();
  const form = useForm<RegisterInputs>({
    resolver: zodResolver(inputSchema),
  });

  const { mutate: register, isPending } = useRegister();

  const onSubmit = async (inputs: RegisterInputs) => { 
    await register({ inputs }, {
      onSuccess: (response) => {
        console.log('response', response);
        form.reset();
      },
      onSettled: () => {
        form.reset();
      }
    })

  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 max-w-lg mx-auto'>
          <h4 className='text-center text-2xl font-bold'>
            Create your account
          </h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name='first_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-medium'>First Name</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      {...field}
                      className='w-full border-border focus-visible:ring-offset-0'
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
                  <FormLabel className='font-medium'>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      {...field}
                      className='w-full border-border focus-visible:ring-offset-0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2">
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-medium'>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        {...field}
                        className='w-full border-border focus-visible:ring-offset-0'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-medium'>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      {...field}
                      className='w-full border-border focus-visible:ring-offset-0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password_confirmation'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-medium'>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      {...field}
                      className='w-full border-border focus-visible:ring-offset-0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type='submit'
            variant='default'
            className='block w-full text-center font-semibold text-white'
            disabled={isPending}
          >
            {isPending ? <AppSpinner className='mx-auto' /> : 'Sign Up'}
          </Button>
          <p className='mt-5 text-center'>
            Already a member?{' '}
            <Link href='/login' className='text-primary'>
              Login
            </Link>
          </p>
        </form>
      </Form >
    </>
  );
};

export default RegisterForm;
