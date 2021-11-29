import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ProductosPromo } from '../interfaces/productos.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private baseUrl: string = environment.api.base;
  private header: string = environment.header;

  constructor(private http:HttpClient) { }

  listarProductos(){
    return this.http.get<ProductosPromo>(`${this.baseUrl}productos/ws/categoria-listar-productos/${this.header}&id_sucursal=20&id_categoria=485&id_subcategoria=0&offset=0&limit=100`);

  }
}
