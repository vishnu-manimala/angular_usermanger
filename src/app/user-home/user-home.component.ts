import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { JwtService } from '../servicejwt/jwt.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  username:string="";
constructor(private service:UserService, private router:Router,private jwtService:JwtService){
  const data = this.jwtService.getSessionData();
  this.username = data.username;
  console.log("in constructoe user",data)
}
}
