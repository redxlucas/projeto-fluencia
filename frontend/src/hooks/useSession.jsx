import { useEffect, useState, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { startPracticeSession, endPracticeSession } from '../services/session'
import api from '../services/api'

export function useSession() {
    const [sessionId, setSessionId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const location = useLocation()
    const prevLocation = useRef(location)

    // Inicia sessão com categorias
    const startSession = useCallback(async (categoryIds) => {
        setLoading(true)
        setError(null)
        try {
            const data = await startPracticeSession(categoryIds)
            setSessionId(data.session_id)
            return data
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const endSession = useCallback(async () => {
        if (!sessionId) return
        setLoading(true)
        setError(null)
        try {
            await endPracticeSession(sessionId)
            setSessionId(null)
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [sessionId])

    useEffect(() => {
        if (!sessionId) return

        if (location.pathname !== prevLocation.current.pathname) {
            endPracticeSession(sessionId).catch(console.error)
            setSessionId(null)
        }

        prevLocation.current = location
    }, [location, sessionId])

    useEffect(() => {
        if (!sessionId) return

        const handleBeforeUnload = (event) => {
            event.preventDefault()
            event.returnValue = ''

            const url = `${api.defaults.baseURL}/sessions/end/${sessionId}`
            navigator.sendBeacon(url)
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [sessionId])

    useEffect(() => {
        if (!sessionId) return

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                const url = `${api.defaults.baseURL}/sessions/end/${sessionId}`
                navigator.sendBeacon(url)
                setSessionId(null)
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            )
        }
    }, [sessionId])

    return {
        sessionId,
        loading,
        error,
        startSession,
        endSession,
    }
}
