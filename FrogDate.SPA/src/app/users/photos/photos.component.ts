import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/app/_services/auth.service';
import { Photo } from 'src/app/models/photo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  @Input()

  photos:Photo[];
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean =false;
  response:string;
  baseUrl=environment.apiUrl;

  constructor(private authService:AuthService) { }



  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader(){
    this.uploader=new FileUploader({
      url:this.baseUrl+'users/'+this.authService.decodedToken.nameid+'/photos',
      authToken:'Bearer' + localStorage.getItem('token'),
      isHTML5:true,
      allowedFileType:["image"],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:10*1024*1024
    });
  }

}
