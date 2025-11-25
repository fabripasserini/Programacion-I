import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
import { GetUserInfo } from '../services/getuserinfo';
export const authsessionGuard: CanActivateFn = (route, state) => {
  const getUserInfo = inject(GetUserInfo);
  const router = inject(Router);
  const token = localStorage.getItem("token");
  const bloqueado= getUserInfo.getBloqueado();
  if(bloqueado){
    router.navigate(['/error-page']);
    return false;
  }
  if(localStorage.getItem("token")){
    return true;
  }else{
    return false;
  }
};
