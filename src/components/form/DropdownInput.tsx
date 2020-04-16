import React, { ChangeEvent } from 'react'

interface DropDownInputProps {
    label?: string
    options: Array<string>
    value: string
    onChange(e: ChangeEvent<HTMLSelectElement>): void
}

export const DropdownInput = ({ label, options, onChange, value }: DropDownInputProps) => {
    return (
        <div className="form-group">
            {label && <label>{label}</label>}
            <select className="form-control" onChange={onChange} value={value}>
                <option>Please choose</option>
                {options && options.length
                    ? options.map((option: string) => <option key={option}>{option}</option>)
                    : null}
            </select>
        </div>
    )
}
