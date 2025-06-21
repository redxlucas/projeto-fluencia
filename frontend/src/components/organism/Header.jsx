import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Binary, User } from 'lucide-react'
import { CustomTooltip } from '../atoms/CustomTooltip'

export const Header = () => {
    const [userName, setUserName] = useState('')
    const [points, setPoints] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            setUserName('')
            return
        }

        try {
            const decoded = jwtDecode(token)
            setUserName(decoded.name || decoded.userName || '')
            setPoints(decoded.points || 0)
        } catch {
            setUserName('')
        }
    }, [])

    return (
        <header className="w-full bg-background text-black-700 h-14 px-8 flex items-center shadow-lg dark:bg-primary-dark">
            <div className="ml-auto flex items-center gap-4 text-sm sm:text-base">
                <CustomTooltip
                    icon={<Binary size={18} className="text-primary" />}
                    text={points}
                    tooltip="Bytes acumulados"
                />
                <CustomTooltip
                    icon={<User size={18} className="text-primary-700" />}
                    text={<span>{userName}</span>}
                    tooltip="Nome de usuário"
                />
            </div>
        </header>
    )
}
