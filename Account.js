
import React, {useState, useEffect} from 'react'
import axios from "axios"
import './style/account.css'

const Account=(props)=>{
    const {handleLogin}= props
    const [data, setData]= useState({})

    useEffect(()=> {
       const tokenValue= JSON.parse(localStorage.getItem('token'))
       if(tokenValue) {
           const url= 'http://dct-user-auth.herokuapp.com/users/account'

           axios.get(url, {headers: {'x-auth': tokenValue.token}})
           .then(res=> {
               
               setData(res.data)
               console.log('data', data)
           handleLogin()
           }).catch(err=> {
               alert(err.message)
           })
       }
    }, [])

    return (
        <div className='account'>

            <h3>Username: {data.username}</h3>
            <h3>Email: {data.email}</h3>
            <h3>join date: {data.createdAt.slice(0,10)}</h3>

        </div>
    )
}

export default Account