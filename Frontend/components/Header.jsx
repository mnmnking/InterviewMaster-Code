'use client';
import React, { useState, useEffect} from "react";

import Logo from './Logo';
import ThemeToggler from "./ThemeToggler"
import Nav from './Nav';
import MobileNav from "./MobileNav";
import { RedirectType, usePathname } from "next/navigation";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

const Header =() => {
  const [header, setHeader] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const scrollYPos = window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setHeader(true): setHeader(false);
    });

    return () => window.removeEventListener('scroll', scrollYPos);
  });

  return (
    // 스크롤 내릴 때, navbar그림자
    <header
      className={`${
        header
          ? 'py-6 bg-white shadow-lg dark:bg-accent'
          : 'py-6 dark:bg-transparent'
      } sticky top-0 z-30 transition-all ${pathname === '/' && 'bg-[#fef9f5]'}`}
    >
      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
          <Logo />
          <div className="flex items-center gap-x-6">
            <Nav 
              containerStyles='hidden xl:flex gap-x-8 
            items-center bg-transparent' 
            linkStyles='relative hover:text-primary
            transition=all'
            underlineStyles='absolute left-0 top-full h-{2px}
            bg-primary w-full'
            />
            <ThemeToggler />
            <div className="xl:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header