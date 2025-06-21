import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchRandomPhrase } from '../services/phrases'
import { speakText } from '../utils/speechSynthesis'
import { Button } from '../components/atoms/Button'
import { ProgressBar } from '../components/atoms/ProgressBar'
import { AnswerForm } from '../components/molecules/AnswerForm'
import { Speech, Snail } from 'lucide-react'
import { checkSessionValidity } from '../services/session'
import { useSession } from '../hooks/useSession'
import { SessionInvalidAlert } from '../components/atoms/InvalidAlert'

const totalSteps = 5

const PhrasePractice = () => {
    const [phrase, setPhrase] = useState('')
    const [translation, setTranslation] = useState('')
    const [userInput, setUserInput] = useState('')
    const [loadingPhrase, setLoadingPhrase] = useState(true)
    const [message, setMessage] = useState(' ')
    const [step, setStep] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
    const { sessionId } = useParams()
    const navigate = useNavigate()
    const [invalidSession, setInvalidSession] = useState(false)

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
            setPhrase(phrase.phrase)
            setTranslation(phrase.translation)
            setLoadingPhrase(false)
        } catch (err) {
            setMessage('Erro ao carregar frase')
            setLoadingPhrase(false)
        }
    }

    const handleInputChange = (e) => {
        setUserInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (step >= totalSteps) return

        if (userInput.trim() === '') {
            setMessage('⚠️ Digite uma resposta antes de enviar.')
            return
        }

        if (userInput.trim().toLowerCase() === translation.toLowerCase()) {
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
                setMessage(
                    `Sessão de prática finalizada!🎉 ${correctCount}/${totalSteps} acertos!`
                )
            }
        }, 1)
    }

    const handleSpeak = (customOptions = {}) => {
        const defaultOptions = { lang: 'en-US', rate: 1 }
        const options = { ...defaultOptions, ...customOptions }
        speakText(phrase, options)
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
                            <p className="text-lg text-primary">{phrase}</p>
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
                            />
                        </>
                    )}

                    {message && <p>{message}</p>}
                </div>
            </div>
        </>
    )
}

export default PhrasePractice
