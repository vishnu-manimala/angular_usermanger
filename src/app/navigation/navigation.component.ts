import { Component } from '@angular/core';
import { JwtService } from '../servicejwt/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(private jwtService:JwtService, private router:Router){}
  logout(){
    console.log("in logout");
    this.jwtService.logout();
    console.log(this.jwtService.isLoggedOut());
    if(this.jwtService.isLoggedOut()){
      this.router.navigate([""]);
    }

  }
}
