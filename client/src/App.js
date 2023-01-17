import './App.css';
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom' 
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import Detalle from './components/Detalle'
import Form from './components/Form'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Switch>
      <Route exact path = '/' component={LandingPage} />
      <Route  path = '/home' component={Home} />
      <Route  path = '/:id' component={Detalle} />
      <Route  path = '/activities' component={Form} />
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
