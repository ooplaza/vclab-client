'use client'
import React, { useState } from "react";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import LOGO from "/public/img/contact.png";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { strings } from "@/utils/strings";
import { Contact } from "@/types/Contact";
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import Navigation from "../navigation";
import { useSendEmail } from "@/lib/ContactAPI";
import AppSpinner from "@/components/AppSpinner";
import Footer from "../footer";
import { Button } from '@/components/ui/button';

const contactSchema = z.object({
  name: z.string().min(1, {
    message: strings.validation.required,
  }),
  email: z.string({
    required_error: strings.validation.required,
  }).email(),
  subject: z.string().min(1, {
    message: strings.validation.required,
  }),
  message: z.string().min(1, {
    message: strings.validation.required,
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const { mutate: sendEmail } = useSendEmail();

  const onSubmit = async (data: ContactInput) => {
    setLoading(true)
    sendEmail(data, {
      onSuccess: () => {
        form.reset();
        setLoading(false);
      },
      onSettled: () => {
        form.reset();
        setLoading(false);
      },
    })
  };


  return (
    <>
      <Navigation />
      <section className="max-w-contentContainer py-24 mx-auto mdl:py-24 flex flex-col gap-4 lgl:gap-8 mdl:px-10 xl:px-4">
        <div className="container">
          <div className="mt-20 mx-6">
            <div className="text-center">
              <SectionTitle
                fontSize={"text-5xl lgl:text-5xl md:text-4xl sm:text-3xl xs:text-2xl"}
                title="Get in touch with us"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mt-20 mx-auto w-full max-w-5xl">
            <div className="rounded-lg order-2 lg:order-1">
              <div className="object-contain h-60 w-96">
                <Image
                  priority={true}
                  quality={100}
                  src={LOGO}
                  alt="Logo"
                  layout="responsive"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 w-full lg:w-1/2 p-6 border border-gray-300 rounded-md shadow-md bg-white">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name">Name</FormLabel>
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
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input type='text' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='subject'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="subject">Subject</FormLabel>
                        <FormControl>
                          <Input type='text' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='message'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="message">Message</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="w-full h-24 shadow-sm rounded-md p-2" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type='submit'
                    variant='default'
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition duration-300 relative"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <AppSpinner className='mx-auto' />
                        <span className="ml-2">Sending ...</span>
                      </div>
                    ) : 'Send'}
                  </Button> 
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ContactPage;
