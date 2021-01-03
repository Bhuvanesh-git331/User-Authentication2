import React, {useState, useEffect} from 'react'
import './UserRegister.css'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'


const UserRegister=(props)=> {
    const [loginData, setLoginData]=useState({username:'', email:'', password:''})
    const [formErrors, setFormErros]= useState({})
    const [loggedIn, setLoggedIn]= useState(false)
    const errors={}

    const handleChange=(e)=> {
        setLoginData({...loginData,[e.target.name]:e.target.value})
    }

    const runValidation=()=> {
      if(loginData.username.trim().length===0) {
      errors.username='name cannot be blank'
      }

      if(loginData.email.trim().length===0) {
          errors.email='email cannot be blank'
      } else if(!validateEmail(loginData.email)) {
        errors.email='invalid format'
    }

    if(loginData.password.length===0) {
        errors.password='password cannot be blank'
    } else if(loginData.password.length<8) {
        errors.password='password is short'
    } else if(loginData.password.length>128) {
        errors.password='password is long'
    }

    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());}

    const handleSubmit=(e)=> {
        e.preventDefault()

        runValidation()

        if(Object.keys(errors).length===0) {
            setFormErros({})

            const url='http://dct-user-auth.herokuapp.com/users/register'

            axios.post(url, loginData) 
            .then(res=> {
                console.log(res.data)
               {res.data.errors && swal(`username already exist`)}
                if(Object.keys(res.data)[0]!=='errors') {
                    swal('success! you have registered')
                     setLoginData({username:'', password:'', email:''})
                    setLoggedIn(true)
                }  else {
                    setFormErros({errors:'username or email already exist'})
                }
            }).catch(err=> {
                alert(err.message)
            })

        } else {
            setFormErros(errors)
        }
    }

    return (
        <div className='register'>
            <h2>Register with us</h2>

            {formErrors.errors && <span>{formErrors.errors}</span>}

            <form onSubmit={handleSubmit}>

            <input type='text' value={loginData.username} onChange={handleChange} placeholder="Enter username" name='username'/> <br /> <br />

            {formErrors.username && <span style={{color:'black'}}>{formErrors.username}</span>} <br />  <hr width='500px'/> <br />


            <input type='text' value={loginData.email} onChange={handleChange} placeholder='Enter email' name='email'/> <br /> <br/>

            {formErrors.email && <span style={{color:'black'}}>{formErrors.email}</span>} <br />  <hr width='500px'/> <br />


            <input type="password" value={loginData.password} onChange={handleChange} placeholder='Enter password' name='password'/> <br /> <br />

            {formErrors.password && <span style={{color:'black'}}>{formErrors.password}</span>} <br />  <hr width='500px'/> <br />


            {loggedIn ? <button><Redirect to='/login'>Register</Redirect></button>: <button>Register</button>} {'  '} 

            <button><Link to='/'>Cancel</Link></button> 


            </form>

        </div>
    )
}

export default UserRegister 