import React from 'react'

interface FileUploadInputProps {
    label?: string
    value: string
    placeholder?: string
    onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export const FileUploadInput = ({
    label,
    value,
    placeholder = '',
    onChange,
}: FileUploadInputProps) => {
    return (
        <div className="form-group">
            {label && <label>{label}</label>}
            <input
                type="file"
                className="form-control-file"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )
}
