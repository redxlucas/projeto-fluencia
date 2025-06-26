import { useEffect, useState } from 'react'
import { getSessions } from '../services/session'
import { Button } from '../components/atoms/Button'
import { PracticesModal } from '../components/organism/PracticesModal' // ajuste o path conforme

export const HistoryPage = () => {
    const [sessions, setSessions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [selectedSessionId, setSelectedSessionId] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        async function fetchSessions() {
            try {
                setLoading(true)
                setError(null)
                const response = await getSessions()
                const sessionsData = Array.isArray(response)
                    ? response
                    : response?.data || []
                setSessions(sessionsData)
            } catch (err) {
                console.error('Erro ao buscar sessões:', err)
                setError('Erro ao carregar histórico de sessões.')
            } finally {
                setLoading(false)
            }
        }
        fetchSessions()
    }, [])

    function openModalWithSession(sessionId) {
        setSelectedSessionId(sessionId)
        setModalOpen(true)
    }

    function closeModal() {
        setModalOpen(false)
        setSelectedSessionId(null)
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Histórico de Sessões</h1>

            {loading && <p>Carregando histórico...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && !error && sessions.length === 0 && (
                <p>Nenhuma sessão de prática encontrada.</p>
            )}

            <div className="space-y-4">
                {!loading &&
                    !error &&
                    sessions.map((session) => (
                        <div
                            key={session.id}
                            className="border rounded-lg shadow-md p-6 flex flex-col gap-2"
                        >
                            <p>
                                <strong>ID:</strong> {session.id}
                            </p>
                            <p>
                                <strong>Início:</strong>{' '}
                                {new Date(session.started_at).toLocaleString()}
                            </p>
                            <p>
                                <strong>Fim:</strong>{' '}
                                {session.ended_at
                                    ? new Date(
                                          session.ended_at
                                      ).toLocaleString()
                                    : 'Em andamento'}
                            </p>
                            <p>
                                <strong>Acertos:</strong>{' '}
                                {session.total_correct || 0}
                            </p>
                            <p>
                                <strong>Tentativas:</strong>{' '}
                                {session.total_attempts || 0}
                            </p>
                            <Button
                                onClick={() => openModalWithSession(session.id)}
                            >
                                Ver detalhes
                            </Button>
                        </div>
                    ))}
            </div>

            {modalOpen && selectedSessionId && (
                <PracticesModal
                    sessionId={selectedSessionId}
                    onClose={closeModal}
                />
            )}
        </div>
    )
}
