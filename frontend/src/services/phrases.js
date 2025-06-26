import api from './api'

export async function fetchRandomPhrase() {
    try {
        const response = await api.get('/api/phrases/random')
        return response.data
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            throw new Error(error.response.data.error)
        }
        throw new Error('Erro ao buscar frase')
    }
}

export async function getPhraseById(id) {
    try {
        const response = await api.get(`/api/phrases/${id}`)
        return response.data
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            throw new Error(error.response.data.error)
        }
        throw new Error('Erro ao buscar frase')
    }
}
