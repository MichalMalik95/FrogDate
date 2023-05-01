import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: User | any;
  images:GalleryItem[] | any ;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: any)=>{
      this.user=data.user;
    });

    //this.images.data = this.getImages();
    let x=this.getImages();
    this.images = x.map(item => new ImageItem({ src: item.src, thumb: item.thumb }));
  }

  getImages(){
    const imageUrls=[];
    for (let i=0;i<this.user.photos.length;i++){
      imageUrls.push({
        src:this.user.photos[i].url,
        thumb:this.user.photos[i].url
      });
    };
    return imageUrls;
  };
}
