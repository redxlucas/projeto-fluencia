import React from 'react'
import { Header } from '../organism/Header'

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex flex-1 flex-col not-even:w-full">
                {children}
            </main>
        </div>
    )
}
