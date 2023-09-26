import { Injectable } from '@angular/core';
import { JwtService } from '../servicejwt/jwt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  constructor(private jwtService:JwtService, private route:Router) { }
  canActivate(){
    console.log(this.jwtService.isLoggedOut());
    if(this.jwtService.isLoggedOut()){
      return true;
    }else{
      const data = this.jwtService.getSessionData()
      data.role == 'user'?this.route.navigate(["user"]):this.route.navigate(["admin"]);
      return false;
    }
  }
}
