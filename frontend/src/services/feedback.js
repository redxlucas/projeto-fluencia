import api from './api'
export async function sendFeedback(feedback) {
    try {
        const response = await api.post('/api/feedback', { feedback })
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
        throw new Error('Erro ao enviar feedback')
    }
}
