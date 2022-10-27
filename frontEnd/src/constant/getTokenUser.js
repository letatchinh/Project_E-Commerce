import { KEY_USER } from "./LocalStored";

export default function getToken() {
   const tokenUser =  JSON.parse(localStorage.getItem(KEY_USER)) || " " ;
    return tokenUser.token
}