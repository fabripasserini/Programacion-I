export interface NotificacionCreate {
  usuarios: number[] | "todos";
  informacion: string;
}
