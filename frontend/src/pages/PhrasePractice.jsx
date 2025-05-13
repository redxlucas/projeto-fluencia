import React, { useState, useEffect } from 'react'
import { fetchRandomPhrase } from '../services/phrases'
import { speakText } from '../utils/speechSynthesis'
import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'
import { Header } from '../components/Header'

const PhrasePractice = () => {
    const [phrase, setPhrase] = useState('')
    const [translation, setTranslation] = useState('')
    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState(' ')
    const [step, setStep] = useState(0)
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
        if (userInput.trim().toLowerCase() === translation.toLowerCase()) {
            setMessage('✅ Resposta correta!')
        } else {
            setMessage('❌ Resposta incorreta. Tente novamente.')
        }

        setTimeout(() => {
            if (step + 1 < totalSteps) {
                setStep((prev) => prev + 1)
                getPhrase()
            } else {
                step + 1 == totalSteps
                    ? setStep((prev) => prev + 1)
                    : setMessage('🎉 Sessão de prática finalizada!')
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
            <main className="flex-1 flex flex-col items-center justify-center text-center p-4 gap-4">
                <ProgressBar progress={(step / totalSteps) * 100} />
                <h1 className="text-2xl font-bold">Prática de Frases</h1>
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <>
                        <p className="text-lg text-purple-700">{phrase}</p>
                        <div className="flex gap-2">
                            <Button onClick={() => handleSpeak()}>
                                Ouvir a frase
                            </Button>
                            <Button onClick={() => handleSpeak({ rate: 0.6 })}>
                                Ouvir devagar
                            </Button>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-md flex flex-col gap-2"
                        >
                            <input
                                type="text"
                                value={userInput}
                                onChange={handleInputChange}
                                placeholder="Digite a frase"
                                className="w-full p-2 text-lg border-1 border-gray-300 rounded-full"
                            />
                            <Button>Enviar</Button>
                        </form>
                    </>
                )}
                {message && <p>{message}</p>}
            </main>
        </div>
    )
}

export default PhrasePractice
