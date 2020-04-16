import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { ProjectData } from '../features/counter/types'

import placeholder from '../img/placeholder.png'
import seedData from '../data/seed.json'

export const Home: React.FC = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const projectsList = window.localStorage.getItem('projects')

        if (projectsList) {
            setProjects(JSON.parse(projectsList))
        } else {
            const seedJSON = JSON.stringify(seedData)
            window.localStorage.setItem('projects', seedJSON)
            window.location.reload()
        }
    }, [])

    return (
        <div className="container">
            <div className="py1">
                <h1 style={{ color: '#f57f20' }}>Coveo Community App</h1>
                <p>
                    Welcome to Coveo Community, a proof-of-concept app that aims to promote funding, skill-sharing and
                    coaching to friends and family of Coveo employees who have been affected by the devastating Covid19
                    outbreak
                </p>
                <p>
                    This services hopes to provide training and support for loved ones who have lost their jobs or had
                    their careers shattered, so that when things start returning to a sense of normalcy they can hit the
                    ground running
                </p>
                <p>
                    To use this service, an account must be created by a Coveo employee who then creates a Project page
                    for their nominee. The page should outline that persons background and skillset, their objectives
                    for the future and any goals they may have, plus any relevant social media
                </p>
                <p>
                    Following this, it's up to other Coveo employees to donate, promote and offer support through
                    volunteer coaching.
                </p>
            </div>
            {projects.length ? (
                <>
                    <h2 style={{ color: '#f57f20' }}>Current projects</h2>
                    <div className="row flex space-between flex-wrap">
                        {projects.map((p: ProjectData) => (
                            <div className="card my2" key={p.title} style={{ width: '30%' }}>
                                {p.mainImage ? (
                                    <img src={p.mainImage} alt="main" className="card-img-top" />
                                ) : (
                                    <img src={placeholder} alt="main" className="card-img-top" />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title"> {p.title}</h5>
                                    <h6 className="card-title"> {p.name}</h6>
                                    <small style={{ fontSize: '15px' }}>
                                        {p.location.city},{p.location.country}
                                    </small>
                                    <br />
                                    {p.createdOn && (
                                        <small style={{ fontSize: '15px' }}>
                                            {moment(p.createdOn).format('MMM Do YY')}
                                        </small>
                                    )}
                                    <br />
                                    <small style={{ fontSize: '12px' }}>
                                        Sponsored by <a href={`https://coveo.com/${p.sponsor.id}`}>{p.sponsor.name}</a>
                                    </small>
                                    <hr />
                                    <small className="card-text"> {p.shortDesc}</small>
                                    {p._id && (
                                        <p>
                                            <small>
                                                <Link to={`/project/${p._id}`}>See more</Link>{' '}
                                            </small>
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-center flex-column" style={{ height: '400px' }}>
                    <h4>No projects.</h4>
                    <p>
                        Please <Link to="/project/new">create one</Link>
                    </p>
                </div>
            )}
        </div>
    )
}
