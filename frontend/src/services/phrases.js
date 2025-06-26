import api from './api'

export async function fetchRandomPhrase() {
    const response = await fetch('http://127.0.0.1/api/phrases/random')
    if (!response.ok) throw new Error('Erro ao buscar frase')
    return await response.json()
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
