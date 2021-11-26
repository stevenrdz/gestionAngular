import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Carrito } from '../../interfaces/carrito.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  cantidadCarrito!: Carrito;
  valorNotificacion: Number = 0;

  constructor(private router: Router,
    private authService :AuthService) { }

    get usuario(){
      return this.authService.usuario;
    }
    
  ngOnInit(): void {
    this.cantidadCarrito =  JSON.parse(localStorage.getItem('datos') || '{}')
    this.valorNotificacion = this.cantidadCarrito?.datos?.carrito;
  }

  logout(){
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

}
