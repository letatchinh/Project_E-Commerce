import { toast } from 'react-toastify'
const ToastError = (error) =>{
        
        toast.warn(error,{
            position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
          })
    
} 
export default ToastError