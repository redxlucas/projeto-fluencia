import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchRandomPhrase } from '../services/phrases'
import { speakText } from '../utils/speechSynthesis'
import { Button } from '../components/atoms/Button'
import { ProgressBar } from '../components/atoms/ProgressBar'
import { AnswerForm } from '../components/molecules/AnswerForm'
import { Speech, Snail } from 'lucide-react'
import {
    checkSessionValidity,
    endPracticeSession,
    attemptPractice,
} from '../services/session'
import { useSession } from '../hooks/useSession'
import { SessionInvalidAlert } from '../components/atoms/InvalidAlert'

const totalSteps = 5

const PhrasePractice = () => {
    const [phraseData, setPhraseData] = useState(null)
    const [userInput, setUserInput] = useState('')
    const [loadingPhrase, setLoadingPhrase] = useState(true)
    const [message, setMessage] = useState(' ')
    const [step, setStep] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
    const { sessionId } = useParams()
    const navigate = useNavigate()
    const [invalidSession, setInvalidSession] = useState(false)
    const [showEndDialog, setShowEndDialog] = useState(false)
    const [feedback, setFeedback] = useState('')

    const { loading: loadingSession, error: sessionError } = useSession()

    useEffect(() => {
        async function validateSession() {
            if (!sessionId) {
                setMessage('Sessão não especificada na URL.')
                return
            }

            try {
                await checkSessionValidity(sessionId)
                setInvalidSession(false)
                await getPhrase()
                window.speechSynthesis.cancel()
            } catch (error) {
                setInvalidSession(true)
                setMessage('')
                setTimeout(() => navigate('/'), 4000)
            }
        }
        validateSession()
    }, [sessionId, navigate])

    const getPhrase = async () => {
        try {
            const phrase = await fetchRandomPhrase()
            setPhraseData(phrase)
            setLoadingPhrase(false)
        } catch (err) {
            setMessage('Erro ao carregar frase')
            setLoadingPhrase(false)
        }
    }

    const handleInputChange = (e) => {
        setUserInput(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (step >= totalSteps) return

        if (userInput.trim() === '') {
            setMessage('⚠️ Digite uma resposta antes de enviar.')
            return
        }

        try {
            const result = await attemptPractice(
                userInput,
                phraseData?.id,
                parseInt(sessionId)
            )

            if (result.correct) {
                setMessage('✅ Resposta correta!')
                setCorrectCount((prev) => prev + 1)
            } else {
                setMessage('❌ Resposta incorreta. Tente novamente.')
            }

            setUserInput('')

            setTimeout(() => {
                const nextStep = step + 1
                setStep(nextStep)

                if (nextStep < totalSteps) {
                    getPhrase()
                } else {
                    setShowEndDialog(true)
                }
            }, 500)
        } catch (error) {
            console.error('Erro ao tentar resposta:', error)
            setMessage('❌ Erro ao processar a resposta.')
        }
    }

    const handleSendFeedback = () => {
        if (!feedback.trim()) return
        alert('Feedback enviado:\n' + feedback)
        setFeedback('')
        setShowEndDialog(false)
    }

    const handleCloseDialog = async () => {
        try {
            if (sessionId) {
                await endPracticeSession(sessionId)
                console.log('Sessão finalizada com sucesso')
            }
        } catch (error) {
            console.error('Erro ao finalizar sessão:', error.message)
        } finally {
            setShowEndDialog(false)
            navigate('/')
        }
    }

    const handleSpeak = (customOptions = {}) => {
        const defaultOptions = { lang: 'en-US', rate: 1 }
        const options = { ...defaultOptions, ...customOptions }
        if (phraseData?.phrase) {
            speakText(phraseData.phrase, options)
        }
    }

    return (
        <>
            <SessionInvalidAlert
                open={invalidSession}
                onClose={() => setInvalidSession(false)}
            />

            <ProgressBar progress={(step / totalSteps) * 100} />

            <div className="flex-1 grid place-items-center p-6 text-center w-full">
                <div className="max-w-md w-full flex flex-col items-center gap-4">
                    <h1 className="text-2xl font-bold">Prática de Frases</h1>

                    {loadingPhrase || loadingSession ? (
                        <p>Carregando...</p>
                    ) : sessionError ? (
                        <p className="text-red-600">Erro: {sessionError}</p>
                    ) : invalidSession ? null : (
                        <>
                            <p className="text-lg text-primary">
                                {phraseData?.phrase}
                            </p>
                            <div className="flex gap-2">
                                <Button onClick={() => handleSpeak()}>
                                    <Speech size={30} />
                                </Button>
                                <Button
                                    onClick={() => handleSpeak({ rate: 0.4 })}
                                >
                                    <Snail size={30} />
                                </Button>
                            </div>

                            <AnswerForm
                                value={userInput}
                                onChange={handleInputChange}
                                onSubmit={handleSubmit}
                                disabled={showEndDialog}
                            />
                        </>
                    )}

                    {message && <p>{message}</p>}
                </div>
            </div>

            {showEndDialog && (
                <div
                    className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
                    onClick={handleCloseDialog}
                >
                    <div
                        className="bg-white p-6 rounded shadow max-w-lg w-full mx-4 text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-4">
                            Sessão finalizada! 🎉
                        </h2>
                        <p>
                            Você acertou {correctCount} de {totalSteps} frases.
                        </p>

                        <label
                            htmlFor="feedback"
                            className="block text-left mt-6 mb-2 font-semibold"
                        >
                            Deixe seu feedback sobre a sessão:
                        </label>
                        <textarea
                            id="feedback"
                            rows={6}
                            className="w-full p-3 border border-gray-300 rounded resize-none"
                            placeholder="Escreva aqui seu feedback..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />

                        <div className="mt-4 flex justify-center gap-4">
                            <button
                                className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50"
                                onClick={handleSendFeedback}
                                disabled={!feedback.trim()}
                            >
                                Enviar Feedback para E-mail
                            </button>
                            <button
                                className="px-6 py-2 border border-gray-400 rounded-full hover:bg-gray-100"
                                onClick={handleCloseDialog}
                            >
                                Voltar para a página inicial
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PhrasePractice
