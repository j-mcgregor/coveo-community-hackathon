import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faDollarSign, faUsers, faProjectDiagram } from '@fortawesome/free-solid-svg-icons'

import moment from 'moment'
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
                    <div
                        className="jumbotron jumbotron-fluid col-md-12 py5 m0"
                        style={{ background: '#f57f20', color: 'white' }}
                    >
                        <div className="container">
                            <h1>{project.title}</h1>
                            <h6>
                                {project.name}
                                <span className="mx1">|</span>
                                {project.sponsorRelation} of {project.sponsor.name}
                            </h6>
                            <h5 className="my1">{project.category}</h5>
                            <h5>{moment(project.createdOn).format('MMM Do YY')}</h5>
                        </div>
                    </div>
                    <div
                        className="jumbotron jumbotron-fluid col-md-12 py3"
                        style={{ background: '#01488d', color: 'white' }}
                    >
                        <div className="container text-center">
                            <div className="row">
                                <div className="col-md-6">
                                    {project.goal && (
                                        <>
                                            <h3>
                                                <FontAwesomeIcon size="2x" className="mr-2" icon={faDollarSign} />
                                            </h3>
                                            <h4>
                                                ${project.goal.raised} / {project.goal.target} raised
                                            </h4>
                                            <div className="btn btn-lg">Donate</div>
                                        </>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    {project.coaches && (
                                        <>
                                            <h3>
                                                <FontAwesomeIcon size="2x" className="mr-2" icon={faUsers} />
                                            </h3>
                                            <h4>{project.coaches.length} Coaches</h4>
                                        </>
                                    )}
                                </div>
                                {/* <div className="col-md-4">
                                    <h3>
                                        <FontAwesomeIcon size="2x" className="mr-2" icon={faProjectDiagram} />
                                    </h3>
                                    <h4>3 projects completed</h4>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 container py1">
                        <div className="row">
                            <div className="col-md-6 text-justify p1">
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
                <div style={{ height: '90vh', width: '100vw' }} className="flex flex-center flex-column">
                    <h2>No project with this ID</h2>
                    <Link to="/">Go back</Link>
                </div>
            )}
        </div>
    )
}
