import React from 'react'
import Logo from '@public/img/logo-v2.png';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className='py-4 text-center'>
            <div className='flex items-center justify-center'>
                <span className='mr-3'>
                    <Image
                        src={Logo}
                        alt='Logo'
                        quality={100}
                        width={200}
                        height={200}
                    />
                </span>
                <span className='text-sm font-medium text-[#6B7280]'>
                    © {new Date().getFullYear()} VC Lab
                </span>
            </div>
        </footer>
    )
}
