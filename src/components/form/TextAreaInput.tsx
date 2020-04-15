import React, { ChangeEvent } from 'react'

interface TextAreaInputProps {
    label?: string
    type?: string
    value: string
    placeholder?: string
    onChange(e: ChangeEvent<HTMLTextAreaElement>): void
}

export const TextAreaInput = ({
    label,
    value,
    placeholder = '',
    onChange,
}: TextAreaInputProps) => {
    return (
        <div className="form-group">
            {label && <label>{label}</label>}
            <textarea
                className="form-control"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}
