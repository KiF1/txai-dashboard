import { jwtDecode } from "jwt-decode";

export function getIdUser(){
  const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  if(token){
    const decodedToken = jwtDecode(token);
    return decodedToken.sub
  }
  
  return null;
}