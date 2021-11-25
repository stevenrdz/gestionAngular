import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CarritoProductoComponent } from './pages/carrito-producto/carrito-producto.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CarritoProductoComponent,
    DetalleProductoComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
