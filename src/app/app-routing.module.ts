import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdduserComponent } from './admin-home/adduser/adduser.component';
import { EditUserComponent } from './admin-home/edit-user/edit-user.component';
import { UserlistComponent } from './admin-home/userlist/userlist.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AuthService } from './serviceAuth/auth.service'
import { LoginAuthService } from './serviceAuth/login-auth.service';
import { UserAuthService } from './serviceAuth/user-auth.service';
import { UserProfileComponent } from './user-home/user-profile/user-profile.component';

const routes: Routes = [
  {path:"",component:LoginComponent,canActivate:mapToCanActivate([LoginAuthService])},
  {path:"register",component:RegisterComponent,canActivate:mapToCanActivate([LoginAuthService])},
  {path:"admin",component:AdminHomeComponent, canActivate: mapToCanActivate([AuthService])},
  {path:"admin/user",component:UserlistComponent, canActivate: mapToCanActivate([AuthService])},
  {path:"admin/adduser",component:AdduserComponent, canActivate: mapToCanActivate([AuthService])},
  {path:"admin/edit-user",component:EditUserComponent, canActivate: mapToCanActivate([AuthService])},
  {path:"user",component:UserHomeComponent,canActivate: mapToCanActivate([UserAuthService])},
  {path:"user/profile",component:UserProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
