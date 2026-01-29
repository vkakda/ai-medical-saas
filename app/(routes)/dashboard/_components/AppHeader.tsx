import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import path from 'path'
import React from 'react'

const AppHeader = () => {

    const menuOptions = [
        {
            id: 1,
            name: 'Home',
            path: '/home'
        },
        {
            id: 2,
            name: 'History',
            path: '/history'
        },
        {
            id: 3,
            name: 'Pricing',
            path: '/pricing'
        },
        {
            id: 4,
             name: 'Profile',
            path: '/profile'
        }
    ]

  return (
    <div className='flex items-center justify-between p-5 shadow px-10 md:px-20 lg:px-40'>
        <Image src="/logo.svg" alt="Logo" width={120} height={10} />
        <div className='hidden md:flex gap-12 items-center'>
            {menuOptions.map((option, index) => (
                <div key={index}>
                    <h2 className='hover:font-bold cursor-pointer transition-all duration-200 ease-in-out'>{option.name}</h2>
                </div>
            ))}
        </div>
        <UserButton />
    </div>
  )
}

export default AppHeader