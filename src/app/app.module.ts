import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { JwtService } from './servicejwt/jwt.service';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AdminNavigationComponent } from './admin-home/admin-navigation/admin-navigation.component';
import { AdduserComponent } from './admin-home/adduser/adduser.component';
import { EditUserComponent } from './admin-home/edit-user/edit-user.component';
import { UserlistComponent } from './admin-home/userlist/userlist.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-home/user-profile/user-profile.component';
import { MyInterceptorInterceptor } from './ineterceptors/my-interceptor.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userDataManager } from './service/store/user.reducer';
import { userReducer } from './Store/user.reducer';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserHomeComponent,
    AdminHomeComponent,
    NavigationComponent,
    AdminNavigationComponent,
    AdduserComponent,
    EditUserComponent,
    UserlistComponent,
    UserProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule,
    StoreModule.forRoot({ userdata: userDataManager}),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(userReducer)
  ],
  providers: [
  //   {
  //   provide: HTTP_INTERCEPTORS,
  //     useClass: MyInterceptorInterceptor,
  //     multi: true 
  // } 
],
  bootstrap: [AppComponent]
})
export class AppModule { }
