"use client"
import React, { FC, useState, useEffect } from 'react';
import { getServerSession, Session } from 'next-auth';
import AuthOptions from '@/lib/AuthOptions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import Logo from '@public/img/logo-v2.png';
import Image from 'next/image';
import AppNavBurger from './AppNavBurger';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AppHeader: FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getServerSession(AuthOptions);
        setSession(sessionData);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };
    fetchSession();
  }, []);

  const handleLogout = () => {
  };

  return (
    <ul className='flex items-center justify-center bg-white px-5 py-3 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]'>
      <li className='flex items-center'>
        <AppNavBurger />
        <Link href='/' className='flex items-center space-x-2'>
          <Image src={Logo} width={180} height={180} alt='Logo' />
        </Link>
      </li>
      <li className='ml-auto inline-block'>
        <div className='flex items-center space-x-2 relative'>
          {session && (
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src={session?.user.image ?? undefined}
                    alt='@shadcn'
                    className='object-cover cursor-pointer'
                  />
                  <AvatarFallback>
                    {session?.user.first_name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className='absolute right-0 top-10 w-36 bg-white shadow-lg rounded-md border border-gray-200'>
                <button
                  className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  onClick={() => {
                  }}
                >
                  Profile
                </button>
                <button
                  className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </li>
    </ul>
  );
};

export default AppHeader;
