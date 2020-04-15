import React from 'react'
import { v1 as uuidv1 } from 'uuid'
import { Form } from './Form'
import { ProjectData } from '../../features/counter/types'
import { localStorage } from '../../lib/localStorage'

export const Create = () => {
    const handleSubmit = (data: ProjectData) => {
        const newProject = {
            ...data,
            _id: uuidv1(),
        }
        const projects = localStorage.getItem('projects')

        const jsonData: string = JSON.stringify(newProject)
        localStorage.setItem('projects', jsonData)
    }

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
