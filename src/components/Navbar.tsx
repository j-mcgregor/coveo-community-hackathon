import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const Navbar: React.FC = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <div className="collapse navbar-collapse">
                <NavLink to="/">Coveo Community</NavLink>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink to="/project/new" className="nav-link">
                            <FontAwesomeIcon className="mr-2" icon={faPlus} />
                            Create Project
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
)
