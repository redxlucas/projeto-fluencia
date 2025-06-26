import { useEffect, useState } from 'react'
import { Button } from '../atoms/Button'
import { getPractices } from '../../services/session'
import { getPhraseById } from '../../services/phrases'

export function PracticesModal({ sessionId, onClose }) {
    const [practices, setPractices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                setError(null)

                const practicesData = await getPractices(sessionId)

                // Para cada prática, busca a frase pelo phrase_id
                const practicesWithText = await Promise.all(
                    (Array.isArray(practicesData) ? practicesData : []).map(
                        async (practice) => {
                            try {
                                const phrase = await getPhraseById(
                                    practice.phrase_id
                                )
                                return {
                                    ...practice,
                                    phrase_text:
                                        phrase.phrase || 'Frase não encontrada',
                                }
                            } catch {
                                return {
                                    ...practice,
                                    phrase_text: 'Frase não encontrada',
                                }
                            }
                        }
                    )
                )

                setPractices(practicesWithText)
            } catch (err) {
                console.error('Erro ao buscar práticas ou frases:', err)
                setError('Erro ao carregar práticas da sessão.')
            } finally {
                setLoading(false)
            }
        }

        if (sessionId) {
            fetchData()
        }
    }, [sessionId])

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        Práticas da Sessão #{sessionId}
                    </h2>
                    <Button
                        className="p-2 hover:bg-gray-100 rounded"
                        onClick={onClose}
                    >
                        ×
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {loading && (
                        <div className="text-center py-8">
                            <p>Carregando práticas...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-8">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    {!loading && !error && practices.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <p>Nenhuma prática encontrada para esta sessão.</p>
                        </div>
                    )}

                    {!loading && !error && practices.length > 0 && (
                        <div className="space-y-3">
                            {practices.map((practice) => (
                                <div
                                    key={practice.id}
                                    className={`p-4 rounded-lg border-l-4 ${
                                        practice.is_correct
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-red-500 bg-red-50'
                                    }`}
                                >
                                    <div className="grid grid-cols-1 gap-4 text-sm">
                                        <p>
                                            <strong>Frase Original:</strong>{' '}
                                            {practice.phrase_text}
                                        </p>
                                        <p>
                                            <strong>Resposta:</strong>{' '}
                                            {practice.user_input}
                                        </p>
                                        <p>
                                            <strong>Status:</strong>{' '}
                                            {practice.is_correct
                                                ? '✅ Correta'
                                                : '❌ Incorreta'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {!loading && !error && practices.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Total de práticas: {practices.length}</span>
                            <span>
                                Acertos:{' '}
                                {practices.filter((p) => p.is_correct).length}(
                                {practices.length > 0
                                    ? Math.round(
                                          (practices.filter((p) => p.is_correct)
                                              .length /
                                              practices.length) *
                                              100
                                      )
                                    : 0}
                                %)
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
