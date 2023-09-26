import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { JwtService } from '../servicejwt/jwt.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { adduser } from '../service/store/user.actions';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {
  constructor(private store: Store<{userdata:{userdata:number}}> ,private service: UserService, private route: Router, private jwtService:JwtService) {
   const datas =  this.service.check();
  console.log()
   }

  emailId: string = "";
  password: string = "";
  borderColor: string = "";
  passwordBorderColor: string = "";
  status: boolean = false;
  message: string = "";
  
  emailValidate() {
    console.log(this.emailId)
    if ((/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(this.emailId)) {
      this.borderColor = "green";
      return true;
    } else {
      this.borderColor = "red";
      return false;
    }
  }

  passwordValidate() {
    console.log(this.password)
    if (this.password.length < 8) {
      this.passwordBorderColor = "red";
      return false
    } else {
      this.passwordBorderColor = "green";
      return true;
    }
  }

  validateLogin() {

    if (this.passwordValidate() && this.emailValidate()) {
      this.service.getLoginData(this.emailId, this.password).subscribe(result => {
        if (typeof (result) == 'object') {
          const session = this.jwtService.setToken(result)
          console.log("data: ",this.jwtService.getSessionData())
          console.log(session);
          if (session) {
            if (result.role == "user") {
              this.route.navigate(["user"]);
              this.store.dispatch(adduser())
            } else if (result.role == "admin") {
              this.route.navigate(["admin"]);
              this.store.dispatch(adduser())
            }
          }
        } else if (result == "wrong password") {
          this.message = "Password Incorrect";
          this.status = true;
          setTimeout(() => {
            this.status = false;
          }, 2000);

        } else if (result == "Not registered") {
          this.message = "User not registred";
          this.status = true;
          setTimeout(() => {
            this.status = false;
          }, 2000);
        } else {
          this.message = "Something went wrong!!!!";
          this.status = true;
          setTimeout(() => {
            this.status = false;
          }, 2000);
        }
      })
    }
  }

}
