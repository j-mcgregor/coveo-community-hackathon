import React from 'react'
import { Form } from './Form'

export const Create = () => {
    const handleSubmit = () => console.log('hit')

    return (
        <div className="container py3">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <Form onSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    )
}
