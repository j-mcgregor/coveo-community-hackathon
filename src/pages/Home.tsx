import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
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
            <div className="py1">
                <h1>Coveo Community App</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae explicabo amet aperiam voluptate dolor
                    hic soluta quasi ad culpa nostrum nobis quod error eius qui possimus vitae sequi, totam nihil.
                </p>
            </div>
            {projects.length ? (
                <>
                    <h1>Current projects</h1>
                    <div className="row flex space-between flex-wrap">
                        {projects.map((p: ProjectData) => (
                            <div className="card my2" key={p.title} style={{ width: '30%' }}>
                                {p.mainImage && <img src={p.mainImage} className="card-img-top" alt="main" />}{' '}
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
