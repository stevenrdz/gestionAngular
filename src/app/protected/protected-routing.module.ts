import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { CarritoProductoComponent } from './pages/carrito-producto/carrito-producto.component';
import { ValidarTokenGuard } from '../guards/validar-token.guard';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
        /* children: [
          {path: 'detalle', component: DetalleProductoComponent},
          {path: 'carrito', component: CarritoProductoComponent},
          {path: '**', redirectTo: '' }
        ], */
  },
  {
    path: 'detalle/:id', 
    component: DetalleProductoComponent,
    
  },
  {
    path: 'carrito', 
    component: CarritoProductoComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
