import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { Photo } from 'src/app/models/photo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getUserPhotoChange = new EventEmitter<string>();

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  baseUrl = environment.apiUrl;
  response: string;
  currentMain: Photo;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        '/users/' +
        this.authService.decodedToken.nameid +
        '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, respons, status, headers) => {
      if (respons) {
        const res: Photo = JSON.parse(respons);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
        };
        this.photos.push(photo);

        if(photo.isMain){
          this.authService.changeUserPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem(
            'user',
            JSON.stringify(this.authService.currentUser)
          );
        }
        }
      }
    };

  setMainPhoto(photo: Photo) {
    this.userService
      .setMainPhoto(this.authService.decodedToken.nameid, photo.id)
      .subscribe(
        () => {
          console.log('Photo corectly set as Main');
          this.currentMain = this.photos.filter((p) => p.isMain === true)[0];
          this.currentMain.isMain = false;
          photo.isMain = true;
          this.authService.changeUserPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem(
            'user',
            JSON.stringify(this.authService.currentUser)
          );
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  deletePhoto(id: number) {
    this.alertify.confirm(
      'Are you shure you want to delete this photo?',
      () => {
        this.userService
          .deletePhoto(this.authService.decodedToken.nameid, id)
          .subscribe(
            () => {
              this.photos.splice(
                this.photos.findIndex((p) => p.id === id),
                1
              );
              this.alertify.success('Photo has been deleted');
            },
            (error) => {
              this.alertify.error('Problem with deleting photo');
            }
          );
      }
    );
  }
}
