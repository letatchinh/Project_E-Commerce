import axios from "axios"
const AxiosUser = axios.create({
   headers : {
       'content-type' : 'application/json'
   },
  });
  export  default AxiosUser