import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, catchError, map, of } from 'rxjs';
import { PaginationResult } from '../models/pagination';

@Injectable()
export class UserListResolver implements Resolve<PaginationResult<User[]>> {

  pageNumber=1;
  pageSize=16;
  params={minAge:18, maxAge:100, gender:"all", zodiacSign:"all"};

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PaginationResult<User[]>> {
    return this.userService.getUsers(this.pageNumber,this.pageSize,this.params).pipe(
      catchError(error=>{
        this.alertify.error('Download data problem');
        this.router.navigate(['']);
        return of();
    })
    );
  }
}
