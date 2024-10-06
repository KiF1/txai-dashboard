export function verifyTokenSaved(){
  const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  if(token){
    return true;
  }
  return false;
}