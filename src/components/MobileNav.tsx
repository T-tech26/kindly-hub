'use client'

import { useLayoutContext } from '@/context/LayoutContext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const MobileNav = () => {

    const { toggleNav, setToggleNav } = useLayoutContext();

  return (
    <nav className={`w-full h-screen fixed top-0 left-[110%] bg-white ${toggleNav}`}>
        <div className='flex items-center justify-between px-5 h-16 w-full'>
            <Link href={"/"} className="logo text-nowrap">Kindly Hub</Link>

            <Image 
                height={30}
                width={30}
                src={'close.svg'}
                alt='close'
                className='cursor-pointer'
                onClick={() => setToggleNav('hide-mobile-nav')}
            />
        </div>

        <ul className="h-full flex flex-col items-center justify-around">
            <div className='flex flex-col justify-center gap-6'>
                <li>
                    <Link 
                        href="/#home" 
                        className="text-base hover:text-(--primary-blue) transition-all cursor-pointer"
                        onClick={() => setToggleNav('hide-mobile-nav')}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link 
                        href="/#about" 
                        className="text-base hover:text-(--primary-blue) transition-all cursor-pointer"
                        onClick={() => setToggleNav('hide-mobile-nav')}
                    >
                        About
                    </Link>
                </li>
                 <li>
                    <Link 
                        href="/#how-it-works" 
                        className="text-base hover:text-(--primary-blue) transition-all cursor-pointer"
                        onClick={() => setToggleNav('hide-mobile-nav')}
                    >
                        How it works
                    </Link>
                </li>
                 <li>
                    <Link 
                        href="/#stories" 
                        className="text-base hover:text-(--primary-blue) transition-all cursor-pointer"
                        onClick={() => setToggleNav('hide-mobile-nav')}
                    >
                        Stories
                    </Link>
                </li>
                 <li>
                    <Link 
                        href="/#transparency" 
                        className="text-base hover:text-(--primary-blue) transition-all cursor-pointer"
                        onClick={() => setToggleNav('hide-mobile-nav')}
                    >
                        Transparency
                    </Link>
                </li>
                 <li>
                    <Link 
                        href="/#news" 
                        className="text-base hover:text-(--primary-blue) transition-all cursor-pointer"
                        onClick={() => setToggleNav('hide-mobile-nav')}
                    >
                        News
                    </Link>
                </li>
                 <li>
                    <Link 
                        href="/#contact" 
                        className="text-base hover:text-(--primary-blue) transition-all cursor-pointer"
                        onClick={() => setToggleNav('hide-mobile-nav')}
                    >
                        Contact
                    </Link>
                </li>
            </div>

            <button className="donate-btn text-sm font-medium">
                <Link 
                    href="/#donation" 
                    onClick={() => setToggleNav('hide-mobile-nav')}
                >
                    Donate Now
                </Link>
            </button>
        </ul>
    </nav>
  )
}

export default MobileNav