import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

import * as moment from "moment";
@Injectable({
  providedIn: 'root'
})
export class JwtService {



  constructor() { }


  private setSession(data: any) {
   console.log("data4",data)
    localStorage.setItem("token", data.token);
    //console.log(data.token);
    localStorage.setItem('role',data.role);
   console.log("data3",data.role);
   localStorage.setItem('username',data.name);
   console.log("data2",data.name);
  }

  setToken(token: any):boolean {
    this.setSession(token)
    console.log("data1",token)
     return this.isLoggedIn();
  }

  //logout  %%%%%%%%%%%%%
  logout():boolean {
 
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return this.isLoggedIn();
  }

  //isLogged in like middle ware

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return token?true:false;
  }
    

  getSessionData(){
    const data= {
      token:localStorage.getItem('token'),
      role:localStorage.getItem("role"),
      username:localStorage.getItem("username")
    }
    this.isLoggedIn();
    return data;
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }
  getExpiration() {
    const time = localStorage.getItem('expiresIn');
   
    const expiresIn = JSON.parse(time);
    console.log("saved time",moment(expiresIn))
    return moment(expiresIn);
  }
}
