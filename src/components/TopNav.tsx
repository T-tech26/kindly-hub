'use client'

import { useLayoutContext } from '@/context/LayoutContext';
import Link from 'next/link';
import React from 'react'

const TopNav = () => {
  
  const { setToggleNav } = useLayoutContext();

  return (
    <nav className="navbar max-w-[1920px]">
        <div className="nav-content gap-1.5">
          <Link href={"/"} className="logo text-nowrap">Kindly Hub</Link>

          <ul className="nav-links gap-[1.1rem] lg:gap-[2rem] hidden md:flex md:flex-wrap">
            <li>
                <Link 
                    href="/" 
                    className="text-base hover:text-(--primary-blue) transition-all cursor-pointer"
                >
                    Home
                </Link>
            </li>
            <li>
                <Link 
                    href="/#about" 
                    className="text-base hover:text-(--primary-blue) transition-all cursor-pointer"
                >
                    About
                </Link>
            </li>
              <li>
                <Link 
                    href="/#how-it-works" 
                    className="text-base hover:text-(--primary-blue) transition-all cursor-pointer"
                >
                    How it works
                </Link>
            </li>
              <li>
                <Link 
                    href="/#stories" 
                    className="text-base hover:text-(--primary-blue) transition-all cursor-pointer"
                >
                    Stories
                </Link>
            </li>
              <li>
                <Link 
                    href="/#transparency" 
                    className="text-base hover:text-(--primary-blue) transition-all cursor-pointer"
                >
                    Transparency
                </Link>
            </li>
              <li>
                <Link 
                    href="/#news" 
                    className="text-base hover:text-(--primary-blue) transition-all cursor-pointer"
                >
                    News
                </Link>
            </li>
              <li>
                <Link 
                    href="/#contact" 
                    className="text-base hover:text-(--primary-blue) transition-all cursor-pointer"
                >
                    Contact
                </Link>
            </li>
          </ul>

          <div className="flex items-center gap-5 pr-4">
            <button 
                className="donate-btn text-sm font-medium"
            >
                <Link 
                    href="/#donation" 
                >
                    Donate Now
                </Link>
            </button>
            <button 
              className="mobile-menu font-extrabold md:hidden" 
              aria-label="Toggle menu"
              onClick={() => setToggleNav('show-mobile-nav')}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>
  )
}

export default TopNav