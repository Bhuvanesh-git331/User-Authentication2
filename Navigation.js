import React from 'react'
import {Link} from 'react-router-dom'
import './style/nav.css'

const Navigation=(props)=> {
    const{toggle, handleLogout}= props

    return (
        <div>
            <div className='header'>
            <h2>User Authentication</h2>
            </div>
            
            <div className='links'>
            {toggle ? (
                <div className='nav'>
                 <p><Link to='/'>Home</Link> |
                    <Link to='/account'>Account</Link> |
                    <Link to='/' onClick={handleLogout}>Logout</Link>
                 </p>
                 

                </div>
                
            ) : (
                <div>
                
                <p>
                  <Link to='/'>Home</Link> |
                  <Link to='/register'>Register</Link> |
                  <Link to='/login'>Login</Link>
                  </p>
        
                </div>
            )
}
</div>

        </div>
    )
}

export default Navigation