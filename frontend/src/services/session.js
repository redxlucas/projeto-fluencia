import api from './api'

export async function startPracticeSession(categoryIds) {
    try {
        const response = await api.post('/api/sessions/start', {
            category_ids: categoryIds,
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
        throw new Error('Erro ao iniciar sessão de prática')
    }
}

export async function endPracticeSession(sessionId) {
    try {
        const response = await api.post(`/api/sessions/${sessionId}/end`)
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

export async function getSessions() {
    try {
        const response = await api.get('/api/sessions')
        return response.data
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            throw new Error(error.response.data.error)
        }
        throw new Error('Erro ao buscar sessões')
    }
}

export async function getPractices(sessionId) {
    try {
        const response = await api.get(`/api/sessions/${sessionId}/practices`)
        return response.data
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            throw new Error(error.response.data.error)
        }
        throw new Error('Erro ao buscar sessões')
    }
}

export async function attemptPractice(userInput, phraseId, practiceSessionId) {
    try {
        const response = await api.post('/api/sessions/attempt', {
            user_input: userInput,
            phrase_id: phraseId,
            practice_session_id: practiceSessionId,
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
        throw new Error('Erro ao registrar tentativa de prática')
    }
}
