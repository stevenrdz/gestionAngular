import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
    private authService :AuthService) { }

    get usuario(){
      return this.authService.usuario;
    }
    
  ngOnInit(): void {
  }

  logout(){

    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

}
