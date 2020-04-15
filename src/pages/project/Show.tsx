import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { ProjectData } from '../../features/counter/types'
import placeholder from '../../img/placeholder.png'

export const Show = () => {
    const [project, setProject] = useState<ProjectData>()
    const { id } = useParams()

    useEffect(() => {
        const projectsList = window.localStorage.getItem('projects')

        if (projectsList) {
            const filteredProject = JSON.parse(projectsList).find((p: ProjectData) => p._id === id)
            setProject(filteredProject)
        }
    }, [])

    return (
        <div className="container-fluid p0">
            {project ? (
                <>
                    <div className="jumbotron jumbotron-fluid col-md-12">
                        <div className="container">
                            <h2>{project.title}</h2>
                        </div>
                    </div>
                    <div className="col-md-12 container py1">
                        <div className="row">
                            <div className="col-md-6 text-justify py1">
                                <p>{project.shortDesc}</p>
                                <small>{project.longDesc}</small>
                            </div>
                            <div className="col-md-6 text-justify py1">
                                <div className="img-container text-center">
                                    {project.mainImage ? (
                                        <img src={project.mainImage} alt="main" className="img-thumbnail" />
                                    ) : (
                                        <img src={placeholder} alt="main" className="img-thumbnail" />
                                    )}
                                </div>
                                <ul className="list-group list-group-flush">
                                    {project.email && (
                                        <li className="list-group-item">
                                            <small>
                                                <a href={`mailto:${project.email}`}>
                                                    <FontAwesomeIcon className="mr-2" icon={faEnvelope} />
                                                    {project.email}
                                                </a>
                                            </small>
                                        </li>
                                    )}
                                    {project.linkedIn && (
                                        <li className="list-group-item">
                                            <small>
                                                <a href={project.linkedIn} target="_blank" rel="noopener noreferrer">
                                                    <FontAwesomeIcon className="mr-2" icon={faLinkedin} />
                                                    {project.linkedIn}
                                                </a>
                                            </small>
                                        </li>
                                    )}
                                    {project.twitter && (
                                        <li className="list-group-item">
                                            <small>
                                                <a href={project.twitter} target="_blank" rel="noopener noreferrer">
                                                    <FontAwesomeIcon className="mr-2" icon={faTwitter} />
                                                    {project.twitter}
                                                </a>
                                            </small>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="col-md-6">
                    <h2>No project with this ID</h2>
                </div>
            )}
        </div>
    )
}
