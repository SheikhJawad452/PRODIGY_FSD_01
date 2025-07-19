import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from './util.js'


function Signup() {
  const navigate = useNavigate();

const [SignUpInfo , setSignUpInfo] = useState({
  name : "",
  email : "",
  password : ""
});

const handleChange = (e)=>{
  const { name , value} = e.target;
  console.log(name,value);

  const copySignUpInfo = { ...SignUpInfo };
  copySignUpInfo[name] = value;
  setSignUpInfo(copySignUpInfo);
}

console.log('SignUpInfo -> ', SignUpInfo)

const handleSignup = async (e)=>{
  e.preventDefault();
  const {name ,email,password} = SignUpInfo;
  if(!name || !email || !password){
    return handleError('All fields must be entered');
  }
  try{
    const url = 'https://prodigy-fsd-01-api.vercel.app/auth/signup';
    const response = await fetch(url,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(SignUpInfo)
    });
    const result = await response.json();
    const { success , message , error } = result;
    if(success){
      handleSuccess(message);
      setTimeout(() => {
        navigate('/login')
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
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div>
            <label htmlFor="name">Name</label>
            <input 
            onChange={handleChange}
            type="text"
            name='name'
            autoFocus
            placeholder='Enter Your Name...'
            value={SignUpInfo.name}
            />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input 
            onChange={handleChange}
            type="email"
            name='email'
            autoFocus
            placeholder='Enter Your Email...'
            value={SignUpInfo.email}
            />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input 
            onChange={handleChange}
            type="password"
            name='password'
            placeholder='Enter Your Password...'
            value={SignUpInfo.password}
            />
        </div>
        <button type='submit'>Signup</button>
        <span className='already-condition'>Already have an account ?
            <Link to={'/login'}>Login</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  )
}

export default Signup
