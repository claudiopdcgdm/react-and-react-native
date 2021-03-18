import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Editar from './pages/Editar'
import Header from './components/Header'


const Routes = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/Sobre/:id' component={Sobre} />
                <Route exact path='/Editar/:id' component={Editar} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes