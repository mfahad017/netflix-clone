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
        dispatch(logout())
        setLoggedIn(true)
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
    
      loggedIn
      ?
      <Router>
       
      <Switch>
      {
        user !== null
        ?
        <>
         <Route component={HomeScreen} path="/browse" />

         <Route component={Profile} path="/profile" />
        <Route component={HomeScreen} path="/" />
        </>
        :
        <Route component={Register} />
      }


      </Switch>

    </Router>
      :null
    
     
            
  );
}

export default App;
