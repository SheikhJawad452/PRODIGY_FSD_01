import {toast} from 'react-toastify';

export const handleSuccess = (mssg)=>{
    toast.success(mssg,{
        position : 'top-center'
    })
}

export const handleError = (mssg)=>{
    toast.error(mssg,{
        position : 'top-center'
    })
}