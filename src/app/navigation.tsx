import React from "react";
import Image from "next/image";
import Logo from '@public/img/logo-v2.png';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Navigation() {
    const navigationItems = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Partnerships & Linkages", path: "/partnerships" },
        { name: "Contact", path: "/contact" },
    ];

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
                        <nav className='mr-6'>
                            <ul className='flex space-x-4'>
                                {navigationItems.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.path}>
                                            <span className="text-md hover:text-bodyColor cursor-pointer duration-300 nav-link">
                                                {item.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <Link href='/login' passHref>
                            <Button className='rounded-lg text-white'>
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
