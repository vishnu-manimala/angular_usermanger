import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 
  constructor(private builder:FormBuilder,private service: UserService, private router:Router){

  }
 statuc:boolean=false;
 message: string = ""
  registerform  = this.builder.group({
    username: this.builder.control('',Validators.required),
    email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
    phone:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])),
    password:this.builder.control('',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    role:this.builder.control('user'),
    isActive:this.builder.control(true)
  });

  proceedToRegister(){
    console.log(this.registerform)
   
      if(this.registerform.valid){
        try{
        this.service.registeruser(this.registerform.value).subscribe((result: any)=>{
          if(result == "success"){
            console.log(result);
            this.message = "Succesfully Registered"
            this.statuc=true;
            setTimeout(() => {
              this.router.navigate([""])
            }, 3000);
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
      }catch(err){
        console.log(err)
      }
      } else{
        this.message = "Enter valid details!"
        this.statuc=true;
        setTimeout(() => {
          this.statuc=false;
        }, 3000);
      }
  }
 

}
