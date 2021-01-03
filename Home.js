import React, {useEffect, useState} from 'react'
import './style/Home.css'

const Home=(props)=> {
  const {handleLogin}= props
  const [fullScreen, setFullScreen] = useState(false)
  const toggleFullScreen = () => setFullScreen(prevState => !prevState)

  useEffect(()=> {
      const tokenValue=localStorage.getItem('token')
      console.log('tokenValue', tokenValue)
      if (tokenValue) {
          handleLogin()
      }
  }, []) 

  const image={
      img: 'https://www.skstprojects.com/wp-content/uploads/2019/12/imresizer.com_-2.jpg'
  }

  
    return (
        <div className='home'>

     <div className='logo'>
     <img src={image.img} alt='Authentication Required'/>
     </div>
    
    <div className='content'>
     <div className='leftcontent'>
     <p>
     Authentication is the act of proving an assertion, such as the identity of a computer system user. In contrast with identification, the act of indicating a person or thing's identity, authentication is the process of verifying that identity 
     </p>
     </div>
     
     <div className='rightcontent'>
     <p>Authorization is a process by which a server determines if the client has permission to use a resource or access a file. Authorization is usually coupled with authentication so that the server has some concept of who the client is that is requesting access</p>
     </div>
     </div>


        </div>

    )
}



export default Home 