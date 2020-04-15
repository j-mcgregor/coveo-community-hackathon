import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar: React.FC = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse">
            <NavLink to="/">Coveo Community</NavLink>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/about" className="nav-link">
                        About
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/project/new" className="nav-link">
                        Create Project
                    </NavLink>
                </li>
            </ul>
        </div>
    </nav>
)
