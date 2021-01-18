import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Board from './Board'
import { BoardContextProvider } from './BoardContext'
import GameOver from './GameOver'
function App() {
    return (
        <Router>
            <Switch>
                <BoardContextProvider>
                    <Route exact path="/" component={Board} ></Route>
                    <Route exact path="/end" component={GameOver}></Route>
                </BoardContextProvider>
            </Switch>
        </Router>
    )
}

export default App
