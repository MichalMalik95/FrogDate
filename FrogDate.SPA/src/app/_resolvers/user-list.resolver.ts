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
import { Observable, catchError, of } from 'rxjs';

@Injectable()
export class UserListResolver implements Resolve<User[]> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers().pipe(
        catchError(error=>{
            this.alertify.error('Download data problem');
            this.router.navigate(['']);
            return of();
        })
    )
  }
}
