import { CanActivateFn } from '@angular/router';

export const authnotsessionGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem("token")){
    return false;
  }else{
    return true;
  }
};
