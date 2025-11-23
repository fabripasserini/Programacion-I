export interface PedidoCreate {
  id_usuario: number;
  descripcion: string;
  direccion: string;
  productos: {
    id_producto: number;
    cantidad: number;
  }[];
}
