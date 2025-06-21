import api from './api'

export async function login(email, password) {
    try {
        const response = await api.post('/auth/login', { email, password })
        return response.data
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            throw new Error(error.response.data.error)
        }
        throw new Error('Erro ao conectar com o servidor')
    }
}

export async function register(name, email, password) {
    try {
        const response = await api.post('/auth/register', {
            name,
            email,
            password,
        })
        return response.data
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            throw new Error(error.response.data.error)
        }
        throw new Error('Erro ao conectar com o servidor')
    }
}
