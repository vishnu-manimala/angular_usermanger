import { Injectable } from '@angular/core';
import { JwtService } from '../servicejwt/jwt.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  
  constructor(private jwtService:JwtService, private router:Router) { }
  canActivate() {
    console.log("in auth>>",this.jwtService.isLoggedIn())
    if(this.jwtService.isLoggedIn()){
      const data=this.jwtService.getSessionData()
      if(data.role == 'admin'){
        return true;
      }else{
        this.router.navigate(["user"]);
        return false;
      } 
    }else {
      this.router.navigate([""]);
      return false;
    } 
  }
  
}
