import { useState } from 'react'

export const useForm = (initialValue = '', onSubmitCallback) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmitCallback(value)
        setValue('')
    }

    return {
        value,
        onChange: handleChange,
        handleSubmit,
    }
}
