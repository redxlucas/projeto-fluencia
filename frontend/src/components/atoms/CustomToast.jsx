// components/atoms/SimpleToast.jsx
import { useState, useRef, useEffect } from 'react'
import * as Toast from '@radix-ui/react-toast'

export const CustomToast = ({ message, open, onOpenChange }) => {
    const timerRef = useRef(0)

    useEffect(() => {
        return () => clearTimeout(timerRef.current)
    }, [])

    return (
        <Toast.Provider swipeDirection="top">
            <Toast.Root
                className="bg-primary text-white rounded p-4 shadow-lg ToastRoot"
                open={open}
                onOpenChange={onOpenChange}
            >
                <Toast.Title className="font-bold">Aviso</Toast.Title>
                <Toast.Description asChild>
                    <span>{message}</span>
                </Toast.Description>
            </Toast.Root>
            <Toast.Viewport className="fixed bottom-4 right-4 ToastViewport" />
        </Toast.Provider>
    )
}
