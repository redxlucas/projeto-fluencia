import api from './api'

export async function getAllCategories() {
    try {
        const response = await api.get('/api/categories')
        return response.data
    } catch (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            throw new Error(error.response.data.error)
        }
        throw new Error('Erro ao carregar categorias')
    }
}
