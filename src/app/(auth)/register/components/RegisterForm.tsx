'use client';
import React, { FC, useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useRegister } from '@/lib/AuthenticationAPI';
import AppSpinner from '@/components/AppSpinner';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { strings } from '@/utils/strings';
import { convertBtoMb } from '@/utils/convertBtoMb';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/utils/constants';
import Image from 'next/image';
import { api } from '@/lib/api';
import log from '@/utils/logger';
import GoogleIcon from '@public/img/google-icon.png';

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
  username: z.string({
    required_error: strings.validation.required,
  }).min(3, strings.validation.required),
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
});

export type RegisterInputs = z.infer<typeof inputSchema>;

const RegisterForm: FC = () => {
  const form = useForm<RegisterInputs>({
    resolver: zodResolver(inputSchema),
  });

  const { mutate, isPending } = useRegister();

  const onSubmit = async (inputs: RegisterInputs) => {
    mutate({
      inputs,
    });

    form.reset();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <h4 className='text-center text-2xl font-bold'>
            Create your account
          </h4>
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
                    className='border-border focus-visible:ring-offset-0'
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
                    className='border-border focus-visible:ring-offset-0'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    className='border-border focus-visible:ring-offset-0'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-medium'>Username</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    {...field}
                    className='border-border focus-visible:ring-offset-0'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    className='border-border focus-visible:ring-offset-0'
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
                    className='border-border focus-visible:ring-offset-0'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
      </Form>
    </>
  );
};

export default RegisterForm;
