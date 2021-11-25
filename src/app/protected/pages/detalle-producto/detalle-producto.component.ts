import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Producto } from '../../interfaces/productos.interface';
import { ProductosService } from '../../services/productos.service';

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
  
  constructor(private activateRouter: ActivatedRoute,
    private productoService : ProductosService) { 
      this.activateRouter.params.subscribe(
        ({id}) => {console.log(id) 
        this.idProducto = id }
      );
      this.consultarProductos(this.idProducto)
  }
  ngOnDestroy(): void {
    console.log("Destroy")
    this.pedidosSubscription?.unsubscribe();
  }

  ngOnInit(): void {

    // console.log("img", this.detalleProducto[0].imagenes)
  }

  consultarProductos(id: number){
    this.pedidosSubscription = this.productoService.listarProductos().subscribe((res => {
      if (res.estado) {
        
        this.producto = res.productos

      }
      else{
        (res.estado)
      }
    }))
  }

}
