import React, {Component} from 'react'
import {Route, BrowserRouter} from 'react-router-dom'

import Home from './Page/Home/Home'
import Detail from './Page/Detail/Detail'

class App extends Component{

    

    render(){
        return(
            <BrowserRouter>
                    <Route path = "/" exact component = {Home} />
                    <Route path = "/detail/:id" component = {Detail} />
            </BrowserRouter>
        )
    }

}

export default App;