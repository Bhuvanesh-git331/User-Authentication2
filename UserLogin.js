import React, {useState, useEffect} from 'react'
import {Redirect, Link} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import './style/login.css'


const UserLogin=(props)=> {
    
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [loggedIn, setLoggedIn]= useState(false) 
    const [formErrors, setFormErros]= useState({})
    const errors={}

    // useEffect(()=> {
    //     if(localStorage.getItem('token')) {
    //         handleLogout()
    //     }
    // }, [handleLogout]) 

    const handleEmail=(e)=> {
        setEmail(e.target.value)
    }

    const handlePassword=(e)=> {
        setPassword(e.target.value)
    }

    const runValidation=()=> {
        if(email.trim().length===0) {
         errors.email='email cannot be blank'
        } 
        if(password.trim().length===0) {
            errors.password='password cannot be blank'
        }
    }

    const handleCancel=(e)=> {
        window.location.reload()

        setEmail('')
        setPassword('')
        setFormErros({}) 
    }


    const handleSbmit=(e)=> {
        e.preventDefault()

        runValidation()

        if(Object.keys(errors).length===0) {
            setFormErros({})

            const formData= {
                email: email,
                password: password
            }

            const url='http://dct-user-auth.herokuapp.com/users/login'
            axios.post(url, formData)
            .then(res=> {
                if(Object.keys(res.data)[0]==='errors') {
                    setFormErros({validationError: res.data})
                } else if(Object.keys(res.data)[0]==='token') {
                    localStorage.setItem('token', JSON.stringify(res.data))
                    // handleLogin()
                    swal('Success! you have logged in') 
                    setLoggedIn(true)
                }
            }).catch(err=> {
                swal(err.message)
            })
        } else {
            setFormErros(errors)
        }
    }

    return (
        <div> 
            
            <div className='loginform'>
            <h2>Login to your Account</h2>

            {formErrors.validationError&& <span style={{color:'red'}}>{formErrors.validationError.errors}</span>}

            <form onSubmit={handleSbmit}>

            <input type='text' value={email} onChange={handleEmail} placeholder='email'/> <br />
            {formErrors.email && <span style={{color:'black'}}><strong>{formErrors.email}</strong></span>} <br />  <hr width='500px'/> <br />

            <input type="password" value={password} onChange={handlePassword} placeholder='password'/> <br />
            {formErrors.password && <span style={{color:'black'}}><strong>{formErrors.password}</strong></span>} <br />  <hr width='500px'/> <br />

           <input type='submit' value='Login' style={{width:'20mm'}}/> {' '}
           <input type='button' value='Cancel'style={{width:'20mm'}} onClick={handleCancel}/>
            </form>
            </div>

            {/* <p><Link onClick={handleClick}>forgot password</Link></p> */}

            {loggedIn && <Redirect to='/'/>}
            
        </div> 
    )
}

export default UserLogin