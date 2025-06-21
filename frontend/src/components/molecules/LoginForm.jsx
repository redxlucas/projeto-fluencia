import React, { useState } from 'react'
import { Form } from '../atoms/Form'
import { Button } from '../atoms/Button'
import { login } from '../../services/userService'

export function LoginForm({ onSuccess }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setMessage('')
        setLoading(true)

        try {
            const data = await login(email, password)
            localStorage.setItem('token', data.token)
            setMessage('Login realizado com sucesso!')
            setEmail('')
            setPassword('')
            if (onSuccess) onSuccess()
        } catch (error) {
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="E-mail"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
                type="password"
                placeholder="Senha"
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                        : 'bg-purple-600 hover:bg-purple-700'
                }`}
            >
                {loading ? 'Entrando...' : 'Entrar'}
            </Button>
        </Form>
    )
}
