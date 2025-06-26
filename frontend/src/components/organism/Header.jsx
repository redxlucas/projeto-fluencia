import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Binary, User, Clock, Home } from 'lucide-react'
import { CustomTooltip } from '../atoms/CustomTooltip'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
    const [userName, setUserName] = useState('')
    const [points, setPoints] = useState(0)
    const navigate = useNavigate()

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

    const handleGoToHistory = () => {
        navigate('/historic')
    }

    const handleGoHome = () => {
        navigate('/')
    }

    return (
        <header className="w-full bg-background text-black-700 h-14 px-8 flex items-center shadow-lg dark:bg-primary-dark">
            <div className="mr-auto">
                <button
                    onClick={handleGoHome}
                    className="flex items-center justify-center p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-primary cursor-pointer"
                    title="Home"
                    type="button"
                >
                    <Home size={20} />
                </button>
            </div>

            <div className="ml-auto flex items-center gap-4 text-sm sm:text-base">
                <CustomTooltip
                    icon={
                        <button
                            onClick={handleGoToHistory}
                            className="flex items-center justify-center p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-primary cursor-pointer"
                            title="Histórico"
                            type="button"
                        >
                            <Clock size={18} />
                        </button>
                    }
                    tooltip="Histórico"
                />
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
