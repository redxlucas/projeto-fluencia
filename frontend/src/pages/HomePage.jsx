import React, { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Tabs from '@radix-ui/react-tabs'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

import { Button } from '../components/atoms/Button'
import { LoginForm } from '../components/molecules/LoginForm'
import { RegisterForm } from '../components/molecules/RegisterForm'
import { Play } from 'lucide-react'
import { StartSessionModal } from '../components/organism/StartSessionDialog'

export default function HomePage() {
    const [open, setOpen] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    const validateToken = (token) => {
        if (!token) return false
        try {
            const decoded = jwtDecode(token)
            if (decoded.exp && Date.now() >= decoded.exp * 1000) {
                return false
            }
            return true
        } catch {
            return false
        }
    }

    const checkAuth = () => {
        const token = localStorage.getItem('token')
        setIsAuthenticated(validateToken(token))
    }

    useEffect(() => {
        checkAuth()

        const handleVisibilityChange = () => {
            if (!document.hidden) {
                checkAuth()
            }
        }
        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            )
        }
    }, [])

    function handleStartSession() {
        navigate('/phrasePractice')
    }

    return (
        <div className="flex-1 grid place-items-center p-6 text-center">
            <div className="max-w-xl">
                <h1 className="text-5xl font-bold mb-6 text-gray-900">
                    Bem-vindo ao Echo
                    <span className="text-primary">en</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-10">
                    A plataforma para praticar seu aprendizado
                </p>

                {isAuthenticated ? (
                    <StartSessionModal
                        onSessionStarted={(sessionId) =>
                            navigate(`/phrasePractice/${sessionId}`)
                        }
                    >
                        <Button className="px-8 py-3 bg-primary text-white rounded-md text-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition inline-flex items-center gap-2">
                            <Play size={20} /> Iniciar Sessão
                        </Button>
                    </StartSessionModal>
                ) : (
                    <Dialog.Root open={open} onOpenChange={setOpen}>
                        <Dialog.Trigger asChild>
                            <Button className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-md text-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition">
                                Entrar
                            </Button>
                        </Dialog.Trigger>

                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                            <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full bg-white rounded-lg p-6 shadow-lg transform -translate-x-1/2 -translate-y-1/2 focus:outline-none">
                                <Dialog.Title className="text-2xl font-bold mb-4 text-primary">
                                    Autenticação
                                </Dialog.Title>

                                <Tabs.Root
                                    defaultValue="login"
                                    className="flex flex-col space-y-4"
                                >
                                    <Tabs.List
                                        className="flex border-b border-gray-300 mb-4"
                                        aria-label="Escolha entre Login ou Cadastro"
                                    >
                                        <Tabs.Trigger
                                            value="login"
                                            className="px-4 py-2 -mb-px cursor-pointer border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:font-semibold text-primary focus:outline-none"
                                        >
                                            Login
                                        </Tabs.Trigger>
                                        <Tabs.Trigger
                                            value="register"
                                            className="px-4 py-2 -mb-px cursor-pointer border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:font-semibold text-primary focus:outline-none"
                                        >
                                            Cadastro
                                        </Tabs.Trigger>
                                    </Tabs.List>

                                    <Tabs.Content value="login">
                                        <LoginForm
                                            onSuccess={() => {
                                                setOpen(false)
                                                setIsAuthenticated(true)
                                            }}
                                        />
                                    </Tabs.Content>
                                    <Tabs.Content value="register">
                                        <RegisterForm
                                            onSuccess={() => {
                                                setOpen(false)
                                                setIsAuthenticated(true)
                                            }}
                                        />
                                    </Tabs.Content>
                                </Tabs.Root>

                                <Dialog.Close
                                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                                    aria-label="Fechar"
                                >
                                    ✕
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                )}
            </div>
        </div>
    )
}
