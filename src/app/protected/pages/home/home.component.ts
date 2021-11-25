import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../interfaces/productos.interface';
import { ProductosService } from '../../services/productos.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit{

  producto: Producto[] = [];

  constructor(private router: Router,
    private productoService: ProductosService,
    private authService: AuthService,
    private activateRouter: ActivatedRoute) { 
    this.consultarProductos();
  }
  ngOnInit(){
  }

  get usuario(){
    return this.authService.usuario;
  }
  
  consultarProductos(){
    this.productoService.listarProductos().subscribe((res => {
      if (res.estado) {
        
        this.producto = res.productos
        console.log(this.producto)
      }
      else{
        (res)
      }
    }))
  }

}
