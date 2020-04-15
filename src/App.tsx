import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Create } from './pages/project/Create'
import { Show } from './pages/project/Show'

const Project = () => {
    return (
        <Switch>
            <Route path="/project/new" component={Create} />
            <Route path="/project/:id" component={Show} />
            <Route path="/project" component={Home} exact />
        </Switch>
    )
}

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/project" component={Project} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    )
}

export default App
