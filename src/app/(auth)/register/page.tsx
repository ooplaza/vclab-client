import React from 'react';
import Image from 'next/image';
import Logo from '@public/img/logo-v2.png';
import { getServerSession } from 'next-auth';
import AuthOptions from '@/lib/AuthOptions';
import { redirect } from 'next/navigation';
import RegisterForm from './components/RegisterForm';

const page = async () => {
  const session = await getServerSession(AuthOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className='flex flex-col items-center w-[250] pb-10'>
      <Image src={Logo} width={250} height={250} alt='Logo' className="mt-[150px]" />
      <RegisterForm />
    </div>
  );
};

export default page;
