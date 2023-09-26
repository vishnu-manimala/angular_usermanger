import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { JwtService } from 'src/app/servicejwt/jwt.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  sessiondata: any;
  userdata: any;
  imageFile:any;
  selectedImage:any;
  selectedFile: File | null = null;
  imageSource = 'https://th.bing.com/th/id/OIP.HendJ0HBV7N8_7ozAh3eNAAAAA?pid=ImgDet&rs=1';
  constructor(private jwtservice: JwtService, private service: UserService) {
    this.sessiondata = this.jwtservice.getSessionData();
    console.log("in constructor",this.sessiondata)
    this.service.getUser(this.sessiondata.username).subscribe(result => {
      console.log(result);
      this.userdata = result;
      this.imageFile = 'http://localhost:3001/'+this.userdata.profileImage;
    })
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    if( this.selectedFile){
      this.service.uploadImage(this.selectedFile).subscribe(result=>{
        console.log('Upload successful:', result);
        this.selectedImage = result;
        this.imageFile='http://localhost:3001/'+this.selectedImage.profileImage;
        (error) => {
          // Handle any errors that occur during the upload process
          console.error('Upload error:', error);
        }
      })
      
    }
   
  }
  getSelectedFileUrl(){

  }
}
 