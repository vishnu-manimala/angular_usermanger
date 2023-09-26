import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deleteuser } from 'src/app/service/store/user.actions';

import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {


    tittle:string = "Userlist";
   sharedDataArray:any;
    usersData:any;
    constructor(private store:Store<{userdata:{userdata: any }}>,private service:UserService, private router:Router){
    
      
    }

    ngOnInit(){
      this.dataUpadate()
    }
  
     handleData(data:object){
     this.usersData = data;
    }
    
    dataUpadate(){
      this.service.getUsersData().subscribe((result: any)=>{
        console.log(result);
        this.usersData= result;
        console.log(typeof(result))
        console.log("load",this.usersData);
      })
    }

    editUser(userId:string){
      console.log(userId)
      const queryParams = {
        id:userId
      }
      this.router.navigate(['admin/edit-user'],{queryParams})
    }
    deleteUser(id: any){
      this.service.deleteUser(id).subscribe(result=>{
        console.log(result)
        if(result == 'succes'){
          console.log("inn nav")
          this.service.getUsersData().subscribe(response=>{
            console.log(response);
       
          })
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['admin/user']);
          });
        }else{
          console.log("inn nav bar")
          this.router.navigate(["admin"]);
        }
      })
    }
}
