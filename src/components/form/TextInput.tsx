import React, { ChangeEvent } from 'react'

interface TextInputProps {
    label?: string
    type?: string
    value: string
    placeholder?: string
    onChange(e: ChangeEvent<HTMLInputElement>): void
    logo?: React.ReactElement
}

export const TextInput = ({
    label,
    type = 'text',
    value,
    placeholder = '',
    onChange,
    logo,
}: TextInputProps) => {
    return (
        <div className="form-group">
            {label && <label>{label}</label>}
            {logo ? (
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">{logo}</div>
                    </div>
                    <input
                        type={type}
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                    />
                </div>
            ) : (
                <input
                    type={type}
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            )}
        </div>
    )
}
