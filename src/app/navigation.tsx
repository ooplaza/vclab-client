"use client";
import React, { useState, useEffect, FC } from "react";
import Image from "next/image";
import Logo from '@public/img/logo-v2.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { getSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

const Navigation: FC = () => {
    const pathname = usePathname();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [session, setSession] = useState<Session | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const sessionData = await getSession();
                setSession(sessionData);
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };
        fetchSession();
    }, []);

    const navigationItems = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Partnerships & Linkages", path: "/partnerships" },
        { name: "Contact", path: "/contact" },
    ];

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/login' });
    };

    return (
        <header className='fixed top-0 w-full bg-white py-4 shadow-lg'>
            <div className='container'>
                <div className='after:clear-both after:block'>
                    <div className='float-left'>
                        <Link href='/' passHref>
                            <span className='flex items-center justify-center cursor-pointer'>
                                <span className='mr-4'>
                                    <Image
                                        src={Logo}
                                        alt='Logo'
                                        quality={100}
                                        width={200}
                                        height={200}
                                    />
                                </span>
                            </span>
                        </Link>
                    </div>
                    <div className='float-right flex items-center'>
                        <nav className="mr-6 hidden sm:hidden md:block">
                            <ul className='flex space-x-4 flex-col md:flex-row'>
                                {navigationItems.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.path}>
                                            <span className={`text-md hover:text-bodyColor cursor-pointer duration-300 nav-link ${pathname === item.path ? 'text-primary' : ''}`}>
                                                {item.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="sm:block md:hidden">
                            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                                <SheetTrigger asChild>
                                    <span className="text-md hover:text-bodyColor cursor-pointer duration-300 nav-link">
                                        <Menu onClick={toggleDrawer} size="32" />
                                    </span>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>
                                            <Link href='/' passHref>
                                                <span className='flex items-center justify-center cursor-pointer'>
                                                    <span className='mr-4'>
                                                        <Image
                                                            src={Logo}
                                                            alt='Logo'
                                                            quality={100}
                                                            width={200}
                                                            height={200}
                                                        />
                                                    </span>
                                                </span>
                                            </Link>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <SheetDescription>
                                        <ul className='flex flex-col space-y-4'>
                                            {navigationItems.map((item, index) => (
                                                <li key={index}>
                                                    <Link href={item.path}>
                                                        <span className={`text-md hover:text-bodyColor cursor-pointer duration-300 nav-link ${pathname === item.path ? 'text-primary' : ''}`}>
                                                            {item.name}
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                        {session ? (
                                            <div className='relative'>
                                                <Button className='rounded-lg text-white w-full mt-5' onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}>
                                                    Dashboard
                                                </Button>
                                                {isMobileDropdownOpen && (
                                                    <div className='absolute right-0 mt-2 w-full bg-white rounded-md shadow-lg z-20'>
                                                        <Link href='/dashboard' passHref>
                                                            <span className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                                                Dashboard
                                                            </span>
                                                        </Link>
                                                        <button onClick={handleLogout} className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                                            Logout
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <Link href='/login' passHref>
                                                <Button className='rounded-lg text-white w-full mt-5'>
                                                    Login
                                                </Button>
                                            </Link>
                                        )}
                                    </SheetDescription>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {session ? (
                            <div className='relative'>
                                <Button className='rounded-lg text-white hidden md:block' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    Dashboard
                                </Button>
                                {isDropdownOpen && (
                                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20'>
                                        <Link href='/dashboard' passHref>
                                            <span className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                                Dashboard
                                            </span>
                                        </Link>
                                        <button onClick={handleLogout} className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href='/login' passHref>
                                <Button className='rounded-lg text-white hidden md:block'>
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navigation;
