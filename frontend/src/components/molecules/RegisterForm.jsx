import React, { useState } from 'react'
import { Button } from '../atoms/Button'
import { Form } from '../atoms/Form'
import { register } from '../../services/userService' // ajuste caminho

export function RegisterForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setMessage('')
        setLoading(true)

        try {
            await register(name, email, password)
            setMessage('Cadastro realizado com sucesso! Faça login.')
            setEmail('')
            setPassword('')
        } catch (error) {
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nome Completo"
                required
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
                type="email"
                placeholder="E-mail"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
                type="password"
                placeholder="Senha"
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {message && (
                <p
                    className={`text-sm ${
                        message.includes('sucesso')
                            ? 'text-green-600'
                            : 'text-red-600'
                    }`}
                >
                    {message}
                </p>
            )}
            <Button
                type="submit"
                disabled={loading}
                className={`py-2 rounded-md text-white transition ${
                    loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                }`}
            >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
        </Form>
    )
}
