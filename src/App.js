import React,{useState, useEffect} from 'react';
import "./SASS/main.scss"
import './App.css';

import db, {auth} from "./Firebase/firebase"

import HomeScreen from './Components/Home/HomeScreen';
import Profile from './Components/Profile/Profile'
import Register from './Components/Register/Register'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './Redux/userSlice';

function App() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      if(userAuth){
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }) )
      }
      else{
        dispatch(logout())
      }
      return () => unsubscribe() ;
    })
    
  }, [])
  const [subscription, setSubscription] = useState(null)
  useEffect(() =>{
    if(user)
    { 
      db.collection('customers')
      .doc(user.uid)
      .collection('subscriptions')
      .get()
      .then(querySnapshot =>{
          querySnapshot.forEach(async subscription =>{
              setSubscription({
                  role: subscription.data().role,
                  current_period_end: subscription.data().current_period_end.seconds,
                  current_period_start: subscription.data().current_period_start.seconds
              })
          })
      })
  }
}, [])
  useEffect(() => {

      console.log(subscription);

  }, [subscription])

  return (
     <Router>
       
       <Switch >
          {
            !user 
            ?
              <Register/>
            :
            (
              <>
                <Route component={HomeScreen} path="/" exact />
                <Route component={Profile} path="/profile" exact />
              </>
                )
              }
            <Route path="/">
              <h1>Error 404</h1>
            </Route>
          </Switch>
     </Router>
  );
}

export default App;
