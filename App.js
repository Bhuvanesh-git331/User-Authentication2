import React, {useState,  Component} from 'react'
import {Redirect, Route} from 'react-router-dom'
import './style/App.css'
import UserRegister from './UserRegister'
import Home from './Home'
import UserLogin from './UserLogin'
import Account from './Account'
import Navigation from './Navigation'
import axios from 'axios'
import swal from 'sweetalert'

const App=(props)=> {
  const [token, setToken]= useState({})
  const [toggle, setToggle]= useState(false)
 
const handleLogin=()=> {
  
  const tokenId=JSON.parse(localStorage.getItem('token'))
  setToken(tokenId)
  if(tokenId) {
    setToggle(true)
  }
}

const handleLogout=()=> {
  const tokenData= JSON.parse(localStorage.getItem('token'))
  const url= 'http://dct-user-auth.herokuapp.com/users/logout'

  axios.delete(url, {headers: {'x-auth': tokenData.token}})    
  .then(res=> {
    if(Object.keys(res.data)[0]==='notice') {
       swal('logged out')
       localStorage.clear()
       setToggle(false)
    }
  }).catch(err=> {
    swal(err.message)
  })
}

const PrivateRoute= ({Component: Component,...rest})=> {
   return (
     //show the component only when useris logged in
     <Route path='/account' render={(props)=> {
       if(token) {
         return <Account {...props}/>
       }
       return <Redirect to='/login'/>
     }}/>

   )
}

 
  return (
    <div className='App'>

     <Navigation toggle={toggle} handleLogout={handleLogout}/>
     <Route path='/' exact render={()=> {
       return (
         <div>
           <Home handleLogin={handleLogin}/>
         </div>
       )
     }}/>

     <Route path='/register' render={()=> {
       return (
         <div>
           <UserRegister handleLogout={handleLogout}/>
         </div>
       )
     }}/>

     <Route path='/login' render={()=> {
       return (
         <div>
           <UserLogin handleLogin={handleLogin} handleLogout={handleLogout} />
         </div>
       )
     }}/>

     <PrivateRoute path='/account' render={()=>{
       return (
         <div>
           <Account token={token} handleLogin={handleLogin}/>
         </div>
       )
     }}/>

   
         </div>
       )
     }
     
  


export default App;
