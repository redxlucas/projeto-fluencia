export async function fetchRandomPhrase() {
    const response = await fetch('http://127.0.0.1/api/phrases/random');
    if (!response.ok) throw new Error('Erro ao buscar frase');
    return await response.json();
}