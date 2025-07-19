import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

function RefreshHandle({setIsAuthenticated}) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setIsAuthenticated(true);
            if(
                location.pathname === '/' ||
                location.pathname === '/signup' ||
                location.pathname === '/login'
            ){
                navigate('/home',{replace : false});
            };
        }
    },[location ,navigate , setIsAuthenticated])
  return (
  null
  )
}

export default RefreshHandle
