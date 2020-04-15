import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProjectData } from '../../features/counter/types'

export const Show = () => {
    const [project, setProject] = useState<ProjectData>()
    const { id } = useParams()

    useEffect(() => {
        const projectsList = window.localStorage.getItem('projects')

        if (projectsList) {
            const filteredProject = JSON.parse(projectsList).find(
                (p: ProjectData) => p._id === id
            )
            setProject(filteredProject)
        }
    }, [])

    return (
        <div className="container">
            <div className="row">
                {project ? (
                    <>
                        <div className="col-md-6">
                            <h2>{project.title}</h2>
                            <h5>{project.shortDesc}</h5>
                            <p>{project.longDesc}</p>
                        </div>
                        <div className="col-md-6">
                            <h2>Hi</h2>
                        </div>
                    </>
                ) : (
                    <div className="col-md-6">
                        <h2>No project with this ID</h2>
                    </div>
                )}
            </div>
        </div>
    )
}
