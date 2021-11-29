import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Producto } from '../../interfaces/productos.interface';
import { ProductosService } from '../../services/productos.service';
import { Carrito } from '../../interfaces/carrito.interface';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styles: [
  ]
})
export class DetalleProductoComponent implements OnInit, OnDestroy {

  producto: Producto[] = [];
  idProducto: number = 0;
  detalleProducto: Producto[] = [];
  pedidosSubscription: Subscription | undefined;
  cantidadProducto: number = 1;
  carritoCompra: {} = {};
  cantidadStorage: number = 1;
  historialCarrito!: Carrito;
  flagDiv = false;
  
  constructor(private activateRouter: ActivatedRoute,
    private productoService : ProductosService) { 
      this.activateRouter.params.subscribe(
        ({id}) => { this.idProducto = id }
      );
      this.consultarProductos(this.idProducto)
  }
  ngOnDestroy(): void {
    this.pedidosSubscription?.unsubscribe();
  }

  ngOnInit(): void {
  }

  consultarProductos(id: number){
    this.pedidosSubscription = this.productoService.listarProductos().subscribe((res => {
      if (res.estado) {
        this.producto = res.productos
      }
      else{ (res.estado) }
    }))
  }

  agregarCarrito(){
    this.flagDiv = true;
    if(localStorage.getItem('datos')!){
      this.historialCarrito = JSON.parse(localStorage.getItem('datos') || '{}') 
      this.historialCarrito.datos.carrito += 1
      this.historialCarrito?.datos.historial
        .push({'id': this.idProducto,'cantidad': this.cantidadProducto});
      localStorage.setItem('datos', JSON.stringify(this.historialCarrito));
      // console.log(JSON.parse(localStorage.getItem('datos') || '{}') )

    }else{
      this.carritoCompra = {
        datos: {
          'carrito': Number(this.cantidadStorage),
          'historial': [{'id': this.idProducto,'cantidad': this.cantidadProducto}]
        }
      }
      localStorage.setItem('datos', JSON.stringify(this.carritoCompra));
      // console.log(JSON.parse(localStorage.getItem('datos') || '{}') )
    }
  }

  disCantidadProducto(){
    if(this.cantidadProducto > 1){
      this.cantidadProducto -= 1;
    }
  }

  aumCantidadProducto(){
    this.cantidadProducto += 1;
  }

}
