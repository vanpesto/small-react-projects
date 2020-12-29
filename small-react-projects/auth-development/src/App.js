import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { AuthProvider } from './Account/AuthContext'
import Dashboard from './Account/Dashboard'
import ForgotPassword from './Account/ForgotPassword'
import Login from './Account/Login'
import PrivateRoute from './Account/PrivateRoute'
import Register from './Account/Register'
import UpdateProfile from './Account/UpdateProfile'
function AppRouter() {
    return (
        <Router>
            <Switch>
                <AuthProvider>
                    <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
                    <PrivateRoute exact path="/updateProfile" component={UpdateProfile}></PrivateRoute>
                    <Route exact path="/signup" component={Register}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/forgotPassword" component={ForgotPassword}></Route>
                </AuthProvider>
            </Switch>
        </Router>
    )
}

export default AppRouter
