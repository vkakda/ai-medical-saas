'use client'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const AppHeader = () => {
    const pathname = usePathname();

    const menuOptions = [
        { id: 1, name: 'Home', path: '/dashboard' },
        { id: 2, name: 'History', path: '/dashboard/history' },
        { id: 3, name: 'Pricing', path: '/dashboard/billing' },
        { id: 4, name: 'Profile', path: '#' }
    ]

    return (
        <header className='sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:bg-slate-950/80 dark:border-slate-800'>
            {/* Container with responsive padding and column layout on mobile.
               Laptop (md:): stays in one row.
               Mobile: Top row (Logo + User) and Bottom row (Links) with a GAP.
            */}
            <div className='flex flex-col md:flex-row md:items-center justify-between py-4 px-5 md:h-16 md:py-0 md:px-10 lg:px-20 max-w-[1400px] mx-auto'>
                
                {/* TOP ROW: Logo and UserButton (Spreads on mobile, stays left on laptop) */}
                <div className='flex items-center justify-between w-full md:w-auto md:flex-1'>
                    <Link href="/dashboard" className="transition-opacity hover:opacity-80">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={120}
                            height={40}
                            className="w-[100px] md:w-[120px] h-auto"
                            priority
                        />
                    </Link>

                    {/* Visible only on Mobile top right */}
                    <div className='md:hidden'>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>

                {/* MIDDLE: Navigation Links 
                    mt-5 provides the GAP on mobile. 
                    md:mt-0 removes the gap on laptop screens.
                */}
                <nav className='flex items-center justify-center gap-6 mt-5 md:mt-0 md:gap-8'>
                    {menuOptions.map((option) => (
                        <Link key={option.id} href={option.path}>
                            <h2 className={cn(
                                'text-sm font-medium transition-all duration-200 ease-in-out hover:text-blue-600 cursor-pointer',
                                pathname === option.path 
                                    ? 'text-blue-600 font-bold' 
                                    : 'text-slate-600 dark:text-slate-400'
                            )}>
                                {option.name}
                            </h2>
                        </Link>
                    ))}
                </nav>

                {/* RIGHT: Laptop UserButton (Hidden on mobile to avoid duplication) */}
                <div className='hidden md:flex flex-1 items-center justify-end'>
                    <div className='flex items-center gap-2 border-l pl-4 border-slate-200 dark:border-slate-800'>
                        <UserButton 
                            afterSignOutUrl="/" 
                            appearance={{
                                elements: {
                                    avatarBox: "h-9 w-9 border border-slate-200"
                                }
                            }}
                        />
                        <span className='hidden lg:block text-xs font-semibold text-slate-500'>Account</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AppHeader