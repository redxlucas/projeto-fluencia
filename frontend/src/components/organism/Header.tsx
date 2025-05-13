import React from 'react'
import { Binary, User } from 'lucide-react'
import { CustomTooltip } from '../atoms/CustomTooltip'

export const Header = ({ userName = '@lucas', points = 0 }) => {
    return (
        <header className="w-full bg-background text-black-700 h-14 px-8 flex items-center shadow-md dark:bg-primary-dark">
            <div className="ml-auto flex items-center gap-4 text-sm sm:text-base">
                <CustomTooltip
                    icon={<Binary size={18} className="text-purple-700" />}
                    text={points}
                    tooltip="Bytes acumulados"
                />
                <CustomTooltip
                    icon={<User size={18} className="text-purple-700" />}
                    text={<span>{userName}</span>}
                    tooltip="Nome de usuário"
                />
            </div>
        </header>
    )
}
