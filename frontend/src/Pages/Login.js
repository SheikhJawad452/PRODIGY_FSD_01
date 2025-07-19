import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from './util.js'


function LogIn() {
  const navigate = useNavigate();

const [LogInInfo , setLogInInfo] = useState({
  email : "",
  password : ""
});

const handleChange = (e)=>{
  const { name , value} = e.target;
  console.log(name,value);

  const copyLogInInfo = { ...LogInInfo };
  copyLogInInfo[name] = value;
  setLogInInfo(copyLogInInfo);
}

console.log('LogInInfo -> ', LogInInfo)

const handleLogIn = async (e)=>{
  e.preventDefault();
  const {email,password} = LogInInfo;
  if(!email || !password){
    return handleError('All fields must be entered');
  }
  try{
    const url = 'https://prodigy-fsd-01-api.vercel.app/login';
    const response = await fetch(url,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(LogInInfo)
    });
    const result = await response.json();
    const { success , message, jwtToken, name , error } = result;
    if(success){
      handleSuccess(message);
      localStorage.setItem('token',jwtToken);
      localStorage.setItem('loggedInUser',name)
      setTimeout(() => {
        navigate('/home')
      }, 1000);
    }else if(error){
      const detailsError = error?.details[0].message;
      handleError(detailsError)
    }else if(!success){
      handleError(message);
    }
    console.log(result);
  }catch(err){
    handleError(err);
  }
}
  return (
    <div className='container'>
      <h1>Log In</h1>
      <form onSubmit={handleLogIn}>
        <div>
            <label htmlFor="email">Email</label>
            <input 
            onChange={handleChange}
            type="email"
            name='email'
            autoFocus
            placeholder='Enter Your Email...'
            value={LogInInfo.email}
            />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input 
            onChange={handleChange}
            type="password"
            name='password'
            placeholder='Enter Your Password...'
            value={LogInInfo.password}
            />
        </div>
        <button type='submit'>LogIn</button>
        <span className='already-condition'>Don't have an account ? 
            <Link to={'/signup'}> Signup</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  )
}

export default LogIn
