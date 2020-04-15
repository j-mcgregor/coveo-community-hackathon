import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ProjectData } from '../features/counter/types'

export const Home: React.FC = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const projectsList = window.localStorage.getItem('projects')

        if (projectsList) {
            setProjects(JSON.parse(projectsList))
        }
    }, [])

    return (
        <div className="container">
            <h1>Coveo Community App</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                explicabo amet aperiam voluptate dolor hic soluta quasi ad culpa
                nostrum nobis quod error eius qui possimus vitae sequi, totam
                nihil.
            </p>
            {projects.length ? (
                <>
                    <h1>Current projects</h1>
                    <div className="row flex space-between flex-wrap">
                        {projects.map((p: ProjectData) => (
                            <div
                                className="card my2"
                                key={p.title}
                                style={{ width: '30%' }}
                            >
                                {p.mainImage && (
                                    <img
                                        src={p.mainImage}
                                        className="card-img-top"
                                        alt="main"
                                    />
                                )}{' '}
                                <div className="card-body">
                                    <h5 className="card-title"> {p.title}</h5>
                                    <small className="card-text">
                                        {' '}
                                        {p.shortDesc}
                                    </small>
                                    {p._id && (
                                        <p>
                                            {' '}
                                            <Link to={`/project/${p._id}`}>
                                                See more
                                            </Link>{' '}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <h1>No projects</h1>
            )}
        </div>
    )
}
