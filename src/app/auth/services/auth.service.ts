import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, catchError ,tap} from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { AuthResponse, Usuario } from '../interface/auth.inteface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.api.baseBd;
  private _usuario!: Usuario; 

  constructor(private http: HttpClient) { }


  get usuario(){
    return { ...this._usuario };
  }

  login(email: string, password: string){

    const url = `${this.baseUrl}/auth`;
    const body = { email, password} 
    return this.http.post<AuthResponse>(url, body)
    .pipe( 
      tap(
        resp => {
          if( resp.ok){
            localStorage.setItem('token', resp.token!);
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!
            }
          }
        }
      ),
      map(resp => resp.ok),
      catchError( err => of(false))
      );
  }

  validarToken(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
    .set('x-token',
    localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>( url, { headers })
    .pipe(
      map(resp => {
        localStorage.setItem('token', resp.token!);
        this._usuario = {
          name: resp.name!,
          uid: resp.uid!
        }
        return resp.ok;
      }),
      catchError(err => of(false))
    );
  }

  logout(){
    localStorage.clear();
  }
}
