
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { GetUserInfo } from '../services/getuserinfo';
export const authadminempleadoGuard: CanActivateFn = (route, state) => {
  

  const router = inject(Router);
  const getUserInfo = inject(GetUserInfo);
  const token = localStorage.getItem("token");
  const bloqueado= getUserInfo.getBloqueado();
  if(bloqueado){
    router.navigate(['/error-page']);
    return false;
  }
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const rol = getUserInfo.getRol();

    console.log("Rol decodificado:", rol);

    if (rol === 'admin'||rol === 'empleado') {
      return true;
    } else {
      router.navigate(['/error-page']);
      return false;
    }

  } catch (error) {
    console.error("Error al decodificar el token:", error);
    router.navigate(['/login']);
    return false;
  }
};
