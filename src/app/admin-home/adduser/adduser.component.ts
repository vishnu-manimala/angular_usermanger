import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { adduser } from 'src/app/service/store/user.actions';

import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  userdata$: Observable<number>
  constructor(private store:Store<{userdata:{userdata:any}}>, private builder:FormBuilder, private service:UserService,private router:Router){}
  message:string="";
  statuc:boolean = false;
  userform  = this.builder.group({
    username: this.builder.control('',Validators.required),
    email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
    phone:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])),
    password:this.builder.control('',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    role:this.builder.control('user'),
    isActive:this.builder.control(true)
  });
 
  proceedAddUser(){
    console.log(this.userform.value);
    this.service.registeruser(this.userform.value).subscribe(result=>{
      console.log(result);
      if(result == 'success'){
        console.log("in suuces")
        this.message = "User already Exists!"
        this.statuc=true;
        this.store.dispatch(adduser());
        this.router.navigate(['admin/user']);
      }else if(result == "already exist"){
        this.message = "User already Exists!"
        this.statuc=true;
        setTimeout(() => {
          this.statuc=false;
        }, 3000);
      }
      else{
        this.message = "Registration Failed"
        this.statuc=true;
        setTimeout(() => {
          this.statuc=false;
        }, 3000);
      }
    })
  }
  

}
