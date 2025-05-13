import React from 'react'
import { Input } from '../atoms/Input'
import { Button } from '../atoms/Button'
import { FormGroup } from './FormGroup'

export const AnswerForm = ({ value, onChange, onSubmit }) => {
    return (
        <form
            onSubmit={onSubmit}
            className="w-full max-w-md flex flex-col gap-3"
        >
            <FormGroup>
                <Input
                    value={value}
                    onChange={onChange}
                    placeholder="Digite a frase"
                />
            </FormGroup>
            <Button>Verificar</Button>
        </form>
    )
}
