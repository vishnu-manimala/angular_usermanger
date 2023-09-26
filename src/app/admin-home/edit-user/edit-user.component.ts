import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  userdata:any;
  editform:any;
  id:any;
  
  count$:Observable<object>
constructor(private store: Store<{userdata:{userdata: any }}>,private route: ActivatedRoute,private service:UserService, private builder:FormBuilder,private router:Router){
 
  this.route.queryParams.subscribe(params => {
    // Access query parameters here
   this.id = params['id']; // Replace 'param1' with the name of your query parameter
    this.service.getuserData(this.id).subscribe((result: any)=>{
      console.log(result);
      this.userdata = result.data;
      console.log(this.userdata)
      this.editform = this.builder.group({
        username: this.builder.control(this.userdata.username),
        email:this.builder.control(this.userdata.email,Validators.email),
        phone:this.builder.control(this.userdata.phone,Validators.compose([Validators.minLength(10),Validators.maxLength(10)])),
        role:this.builder.control(this.userdata.role),
        isActive:this.builder.control(this.userdata.isActive),
        password:this.builder.control(this.userdata.password),
        id:this.id
      })
    });
  });
}



proceedToUpdate(){
  if(this.editform.valid){
    this.service.updateUser(this.editform.value).subscribe(result=>{
      console.log("update",result);
      
     if(result == "succes"){

      this.router.navigate(['admin/user'])
     }
    })
  }
}


}



