import React,{useState, useEffect} from 'react';
import "./SASS/main.scss"
import './App.css';

import {auth} from "./Firebase/firebase"

import HomeScreen from './Components/Home/HomeScreen';
import Profile from './Components/Profile/Profile'
import Register from './Components/Register/Register'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './Redux/userSlice';

function App() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const [loggedIn, setLoggedIn] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      if(userAuth){
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }) )
        setLoggedIn(true)
      }
      else{
        setLoggedIn(true)
        dispatch(logout())
      }
      return () => unsubscribe() ;
    })
    
  }, [dispatch])

  useEffect(() => {
    console.log(user)
  }, [user])

  useEffect(() => {
    console.log(loggedIn)
  }, [loggedIn])



  return (
     <Router>
       
      {
        loggedIn
        ?
            !user
            ?
            
              <Register />
            :
            (
              <>
              <Switch >
                <Route component={HomeScreen} path="/browse" exact />
                <Route component={Profile} path="/profile" exact />
                <Route path="/">
                  <h1>Error 404</h1>
                </Route>
              </Switch>
              </>
            )
        :
          null
      }
            
     </Router>
  );
}

export default App;
