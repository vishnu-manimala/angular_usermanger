import { Component, OnInit } from '@angular/core';
import { JwtService } from '../servicejwt/jwt.service';
import { UserService } from '../service/user.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  username:string;
  constructor(private store:Store<{userdata:{userdata:any}}>, private jwtService:JwtService, private service:UserService){

  }
  datadisplay:any;
  ngOnInit(): void {
      this.store.select('userdata').subscribe(data=>{
        this.datadisplay = data;
      })
  }
 
}
