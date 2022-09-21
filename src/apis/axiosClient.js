import axios from "axios"
import {URL_BASE} from '../constant/UrlConstant'
const axiosClient = axios.create({
    baseURL: URL_BASE,
   headers : {
       'content-type' : 'application/json'
   },
  });
  export  default axiosClient