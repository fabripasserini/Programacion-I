import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


export const authuserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem("token");

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const decoded: any = jwtDecode(token);
    const rol = decoded.rol;

    console.log("Rol decodificado:", rol);

    if (rol === 'user') {
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

