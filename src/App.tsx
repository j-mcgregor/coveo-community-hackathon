import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Create } from './pages/project/Create'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <div>
                    <Route path="/" component={Home} exact />
                    <Route path="/about" component={About} />
                    <Route path="/project/new" component={Create} />
                </div>
            </Switch>
        </BrowserRouter>
    )
}

export default App
