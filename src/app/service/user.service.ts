import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../servicejwt/jwt.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private jwtService:JwtService) { }

result:any;
sharedData: any ;
param = {
    header: "Name,Email,Message,Message1,Message2,Message3,Message4",
    URL: "https://docs.google.com/spreadsheets/d/1bfVMAiwIzBKwEDOeGShxoXDiGiz2IHO7Mj1nWHO4Qj8/edit",
    SheetName: "Test2",
    Name: "Vishnu",
    Email: "vishnu@1233@gmail.com",
    message: "test",
    Message1 : "1 My kiddo", 
    Message2 : "1 My kiddo",
    Message3 : "1 My kiddo",
    Message4 : "1 My kiddo"
  }
  
  data={};
  //register %%%%%%%%%%%%%
  registeruser(registerData:any) {
    console.log(registerData)
    return this.http.post('http://localhost:3001/angular/register',registerData)
  }


//login %%%%%%%%%%%%%
  getLoginData(id: string,password: string){
    this.data = {
      id:id,
      password:password
    }
     this.result =  this.http.post('http://localhost:3001/angular/userdata',this.data)
    return this.result;
    
  }

  //to get full data of users
  getUsersData(): Observable<any[]>{
    console.log("in getuserdata")
    return this.http.post<any[]>('http://localhost:3001/angular',this.data)
  }

  //to get single user's data
  getuserData(id: string){
    this.data={userId : id};
    console.log(id);
    this.sharedData = this.http.post('http://localhost:3001/angular/edituser',this.data)
    return this.sharedData;
  }

  updateUser(editdata:any){
    console.log("edit",editdata)
    return this.http.post('http://localhost:3001/angular/edit',editdata)
  }

  deleteUser(id: any){
    this.data={userId : id};
    return this.http.post('http://localhost:3001/angular/delete',this.data)
  }
  searchUserData(searchString: string){
    this.data={searchdata:searchString};
    
    this.sharedData = this.http.post('http://localhost:3001/angular/search',this.data)
    return this.sharedData;
  }

  getUser(item: any){
    console.log("getuser",item);
    this.data={email:item};
    return this.http.post('http://localhost:3001/angular/profile',this.data)
  }

  uploadImage(image: File) {
    const sessiondata =this.jwtService.getSessionData();
    const formData = new FormData();
    formData.append('image', image);
    this.data={id:sessiondata.username};
    return this.http.post(`http://localhost:3001/angular/profileupload?id=${sessiondata.username}`,formData);
  }
  
 check() {
    console.log("param:",this.param);
   const  option = {method:'POST',mode:'no-cors',headers: {
      'Content-Type': 'application/json'
    },body: JSON.stringify(this.param )}
    const data = JSON.stringify(this.param);
    console.log("param:",option);
    const url = `https://script.google.com/macros/s/AKfycbw653skfboOKBA5807YsiDH9uxO5aPIZHSFQaIoCFYYsaeNyJFsLRTwMP_os2XzmTDAxA/exec?${data}`;
  fetch(url,{method:'POST',mode:'no-cors',headers: {
    'Content-Type': 'application/json', // Set the content type to JSON
  },body:JSON.stringify(this.param)})
  //.then(response => response.json())
  .then(result=>{

    console.log("bhbbk",result.body);
    return result;
  }).catch(err=>{
    console.log(err)
  });
  }

}


