import React, { useEffect, useState } from 'react'
import { getAllCategories } from '@/services/category'

export default function CategoryList() {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getAllCategories()
                setCategories(data)
            } catch (err) {
                setError(err.message)
            }
        }

        fetchCategories()
    }, [])

    if (error) return <p>Erro: {error}</p>

    return (
        <ul>
            {categories.map((cat) => (
                <li key={cat.id}>{cat.name}</li>
            ))}
        </ul>
    )
}
