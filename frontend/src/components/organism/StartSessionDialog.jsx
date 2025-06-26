import React, { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { getAllCategories } from '@/services/category'
import { startPracticeSession } from '@/services/session'

export function StartSessionModal({ onSessionStarted }) {
    const [categories, setCategories] = useState([])
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        getAllCategories()
            .then(setCategories)
            .catch((err) => setError(err.message))
    }, [])

    const toggleCategory = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
        )
    }

    const handleStart = async () => {
        setLoading(true)
        try {
            const res = await startPracticeSession(selected)
            onSessionStarted(res.session_id)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="px-4 py-2 bg-primary text-white rounded-full">
                    Iniciar Sessão
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl">
                    <Dialog.Title className="text-xl font-bold mb-4">
                        Escolha as categorias
                    </Dialog.Title>

                    {error && <p className="text-red-600">{error}</p>}

                    <div className="flex flex-wrap gap-2 mb-4">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => toggleCategory(cat.id)}
                                className={`px-3 py-1 border rounded-full ${
                                    selected.includes(cat.id)
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-white'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Dialog.Close asChild>
                            <button className="px-4 py-2 bg-gray-300 rounded-full">
                                Cancelar
                            </button>
                        </Dialog.Close>
                        <button
                            onClick={handleStart}
                            disabled={loading || selected.length === 0}
                            className="px-4 py-2 bg-primary text-white rounded-full disabled:bg-purple-600"
                        >
                            {loading ? 'Iniciando...' : 'Começar'}
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
