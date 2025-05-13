import { useState, useEffect } from 'react'
import { fetchRandomPhrase } from '../services/phrases'
import { speakText } from '../utils/speechSynthesis'
import { Button } from '../components/atoms/Button'
import { ProgressBar } from '../components/atoms/ProgressBar'
import { Header } from '../components/organism/Header'
import { AnswerForm } from '../components/molecules/AnswerForm'
import { Speech, Snail } from 'lucide-react'

const PhrasePractice = () => {
    const [phrase, setPhrase] = useState('')
    const [translation, setTranslation] = useState('')
    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState(' ')
    const [step, setStep] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
    const totalSteps = 5

    const getPhrase = async () => {
        try {
            const phrase = await fetchRandomPhrase()
            setPhrase(phrase.phrase)
            setTranslation(phrase.translation)
            setLoading(false)
        } catch (err) {
            setMessage('Erro ao carregar frase')
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPhrase()
        window.speechSynthesis.cancel()
    }, [])

    const handleInputChange = (e) => {
        setUserInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (step >= totalSteps) {
            return
        }

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
        <div className="min-h-screen flex flex-col">
            <Header />
            <ProgressBar progress={(step / totalSteps) * 100} />
            <main className="flex-1 flex flex-col items-center justify-center text-center p-4 gap-4">
                <h1 className="text-2xl font-bold">Prática de Frases</h1>
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <>
                        <p className="text-lg text-purple-700">{phrase}</p>
                        <div className="flex gap-2">
                            <Button onClick={() => handleSpeak()}>
                                <Speech size={30} />
                            </Button>
                            <Button onClick={() => handleSpeak({ rate: 0.4 })}>
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
            </main>
        </div>
    )
}

export default PhrasePractice
