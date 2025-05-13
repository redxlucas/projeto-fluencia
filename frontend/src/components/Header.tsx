import React from 'react'
import { User } from 'lucide-react'
import { BytesDisplay } from './BytesDisplay'

export const Header = ({ userName = '@lucas', points = 0 }) => {
    return (
        <header className="w-full bg-primary text-black-700 h-14 px-8 flex items-center shadow-md dark:bg-primary-dark">
            <div className="ml-auto flex items-center gap-4 text-sm sm:text-base">
                <BytesDisplay points={points} />
                <span className="flex items-center gap-1 whitespace-nowrap">
                    <User size={18} />
                    {userName}
                </span>
            </div>
        </header>
    )
}
