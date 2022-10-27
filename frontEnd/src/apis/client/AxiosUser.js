import axios from "axios"
// import getToken from "../../constant/getTokenUser";
const AxiosUser = axios.create(
    {
   headers : {
       'content-type' : 'application/json',
    //    Authorization : "Bearer "+ getToken()
   },
  });
  export  default AxiosUser