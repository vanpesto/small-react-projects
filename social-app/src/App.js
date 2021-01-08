import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {FirebaseDatabaseProvider} from '@react-firebase/database'
import { AuthProvider } from './Account/AuthContext'
import Dashboard from './Account/Dashboard'
import ForgotPassword from './Account/ForgotPassword'
import Login from './Account/Login'
import PrivateRoute from './Account/PrivateRoute'
import Register from './Account/Register'
import UpdateProfile from './Account/UpdateProfile'
import Navbar from './Navbar/Navbar'
import AllPosts from './Posts/AllPosts'
import './App.css'
import UserProfile from './Account/UserProfile'
import NotFound from './NotFound'
function AppRouter() {
    return (
        <Router>
            <Switch>
              
                <FirebaseDatabaseProvider>
                <AuthProvider>
                <Navbar/>
                    <Route exact path="/" component={AllPosts}></Route>
                    <PrivateRoute exact path="/account" component={Dashboard}></PrivateRoute>
                    <PrivateRoute exact path="/updateProfile" component={UpdateProfile}></PrivateRoute>
                    <Route path="/user-profile" component={UserProfile}></Route>
                    <Route exact path="/signup" component={Register}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/forgotPassword" component={ForgotPassword}></Route>
                    {/* <Route component={NotFound}></Route> */}
                </AuthProvider>
                
                </FirebaseDatabaseProvider>
                
            </Switch>
        </Router>
    )
}

export default AppRouter
