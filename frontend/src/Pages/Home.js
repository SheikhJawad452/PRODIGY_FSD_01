import React, { useEffect, useState } from 'react'
import { handleSuccess } from './util';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


function Home() {
  const navigate = useNavigate();
  const [loggedInUser , setLoggedInUser] = useState('');
  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])

  const handleLogOut = (e)=>{
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    handleSuccess('Successfully logged Out')
    setTimeout(() => {
      navigate('/login')
    }, 1000);
  }

  return (
    <div>
      <h1>Welcome , {loggedInUser}</h1>
      <button onClick={handleLogOut}>LogOut</button>

      <ToastContainer />
    </div>
  )
}

export default Home
