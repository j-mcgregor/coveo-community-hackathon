import React from 'react'
import { v1 as uuidv1 } from 'uuid'
import { Form } from './Form'
import { ProjectData } from '../../features/counter/types'

export const Create = () => {
    const handleSubmit = (data: ProjectData) => {
        const newProject = {
            ...data,
            _id: uuidv1(),
        }

        const projects = window.localStorage.getItem('projects')

        if (projects) {
            const parsedProjects = JSON.parse(projects)
            parsedProjects.push(newProject)
            window.localStorage.setItem('projects', JSON.stringify(parsedProjects))
        } else {
            const projectList = JSON.stringify([newProject])
            window.localStorage.setItem('projects', projectList)
        }
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
