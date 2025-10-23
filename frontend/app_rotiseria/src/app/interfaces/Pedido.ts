import { UsuarioPedido } from './UsuarioPedido';
import { ProductoPedido } from './ProductoPedido';
export interface Pedido {
  id: number;
  id_usuario: number;
  descripcion: string;
  direccion: string;
  precio: number;
  created_at: string;
  usuario: UsuarioPedido;
  productos: ProductoPedido[];
}
