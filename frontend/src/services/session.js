import api from './api'

export async function startPracticeSession(categoryIds) {
    try {
        const response = await api.post('/api/sessions/start', {
            category_ids: categoryIds,
        })
        console.log('Resposta da API:', response.data)
        return response.data
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            throw new Error(error.response.data.error)
        }
        throw new Error('Erro ao iniciar sessão de prática')
    }
}

export async function endPracticeSession(sessionId) {
    try {
        const response = await api.post(`/api/sessions/end/${sessionId}`)
        console.log('Sessão finalizada:', response.data)
        return response.data
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            throw new Error(error.response.data.error)
        }
        throw new Error('Erro ao finalizar sessão de prática')
    }
}

export async function checkSessionValidity(sessionId) {
    try {
        const response = await api.get(`/api/sessions/${sessionId}/check`)
        return response.data
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            throw new Error(error.response.data.error)
        }
        throw new Error('Erro ao verificar validade da sessão')
    }
}
