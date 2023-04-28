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
export class UserDetailResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.params['id']).pipe(
        catchError(error=>{
            this.alertify.error('Download data problem');
            this.router.navigate(['/users']);
            return of();
        })
    )
  }
}
