import { Component, EventEmitter, Output } from '@angular/core';
import { JwtService } from 'src/app/servicejwt/jwt.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { deleteuser } from 'src/app/service/store/user.actions';
@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent {
 
  constructor(private store: Store<{userdata:{userdata:number}}>, private jwtService:JwtService, private router:Router, private service:UserService){
    this.searchData()
  }
  searchText: string= "";
  
  searchUserData:Observable<any>;
  logout(){
    console.log("in logout");
    this.jwtService.logout();
    console.log(this.jwtService.isLoggedOut());
    if(this.jwtService.isLoggedOut()){
      this.store.dispatch(deleteuser())
      this.router.navigate([""]);
    }

  }
  @Output() 
  dataEmitter: EventEmitter<object> = new EventEmitter<object>();
  searchData(){
    console.log(this.searchText);
    this.service.searchUserData(this.searchText).subscribe(result=>{
      //console.log("array>>",result);
      this.service.sharedData = result;
      const UserData = result;
      this.dataEmitter.emit(result)
      console.log("array>>", this.service.sharedData );

    })
  }
}
