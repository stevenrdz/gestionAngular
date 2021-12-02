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
  tokenUsuario: string | null = '';
  flagUsuario: Boolean = false;

  constructor(private router: Router,
    private authService :AuthService) { }

    get usuario(){
      return this.authService.usuario;
    }
    
  ngOnInit(): void {
    this.cantidadCarrito =  JSON.parse(localStorage.getItem('datos') || '{}');
    this.tokenUsuario =  localStorage.getItem('token')

    this.datosUsuario(this.tokenUsuario);
    this.valorNotificacion = this.cantidadCarrito?.datos?.carrito;
  }

  datosUsuario(data: string | null ){

    if(data != null){ this.flagUsuario = true; }
    else{ this.flagUsuario = false; }

  }

  logout(){
    this.flagUsuario = false
    this.router.navigateByUrl('/home');
    this.authService.logout();
  }

}
