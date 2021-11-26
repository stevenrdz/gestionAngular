import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Subscription } from 'rxjs';
import { Producto } from '../../interfaces/productos.interface';
import { Carrito } from '../../interfaces/carrito.interface';

import Swal from "sweetalert2";

@Component({
  selector: 'app-carrito-producto',
  templateUrl: './carrito-producto.component.html',
  styles: [
  ]
})
export class CarritoProductoComponent implements OnInit {

  pedidosSubscription: Subscription | undefined;
  producto: Producto[] = [];
  historialCarrito!: Carrito;
  totalProductos: Number = 0;

  constructor(private productoService: ProductosService) { }

  ngOnInit(): void {
    this.historialCarrito = JSON.parse(localStorage.getItem('datos') || '{}')
    for(let item of this.historialCarrito.datos.historial){
      this.consultarProductos(Number(item.id));
    }
  }

  consultarProductos(id: Number){
    this.pedidosSubscription = this.productoService.listarProductos().subscribe((res => {
      if (res.estado) { 
        for(let item of res.productos){
          if(item.id_producto == id){
            this.producto.push(item);
            this.totalProductos = +this.totalProductos + Number(item.precio);
          }
        }
      }
      else{ (res.estado) }
    }));
  }

  alertaCompra(){
    Swal.fire(
      'Compra Realizada!',
      'Su pedido esta en camino.',
      'success'
    )
  }

}
