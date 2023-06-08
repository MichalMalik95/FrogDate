import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/models/user';
import { Photo } from 'src/app/models/photo';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/models/pagination';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users:User[] = [];
  user: User = JSON.parse(localStorage.getItem('user') || "{}");
  genderList = [{value:"men", display:"men"},
                {value:"women", display:"women"},
                {value:"all", display:"all"}];
  zodiacSignList = [{value:"Virgo", display:"Virgo"},
                    {value:"Pices", display:"Pices"},
                    {value:"Capricon", display:"Capricon"},
                    {value:"Taurus", display:"Taurus"},
                    {value:"Aries", display:"Aries"},
                    {value:"Scorpio", display:"Scorpio"},
                    {value:"Aquarius", display:"Aquarius"},];
  userParams: any = {}
  pagination: Pagination;

  constructor(private userService: UserService, private alertify:AlertifyService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.users=data['users'].result;
      this.pagination = data['users'].pagination || {};
      this.userParams.gender = this.user.gender === 'women' ? 'men' : 'women';
      this.userParams.zodiacSign = this.user.zodiacSign = 'all';
      this.userParams.minAge = 18;
      this.userParams.maxAge = 100;
      this.userParams.orderBy = "lastActive";

    });
  }
  pageChanged(event:any):void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters(){
    this.userParams.gender = this.user.gender === 'women' ? 'men' : 'women';
    this.userParams.zodiacSign = this.user.zodiacSign = 'all';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 100;
    this.userParams.orderBy = "lastActive";
    this.loadUsers();

  }

  loadUsers(){
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams, null).
    subscribe((res:PaginationResult<User[]>)=>{
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });

  }
  }

