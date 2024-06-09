import React, { useState } from "react";
import Image from "next/image";
import Logo from '@public/img/logo-v2.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Navigation() {
    const pathname = usePathname();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
                            <ul className='flex space-x-4 flex-col  md:flex-row'>
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
                            <Sheet>
                                <SheetTrigger>
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
                                        <Link href='/login' passHref>
                                            <Button className='rounded-lg text-white w-full mt-5'>
                                                Login
                                            </Button>
                                        </Link>
                                    </SheetDescription>
                                </SheetContent>
                            </Sheet>
                        </div>
 
                        <Link href='/login' passHref>
                            <Button className='rounded-lg text-white hidden md:block'>
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
