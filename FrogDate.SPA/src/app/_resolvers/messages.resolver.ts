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
import { Message } from '../models/message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<PaginationResult<Message[]>> {

  pageNumber=1;
  pageSize=16;
  messageContainer = "Unread";
  params={minAge:18, maxAge:100, gender:"all", zodiacSign:"all"};

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PaginationResult<Message[]>> {
    return this.userService.getMessages(this.authService.decodedToken.nameid,this.pageNumber,
                                        this.pageSize, this.messageContainer).pipe(
      catchError(error=>{
        this.alertify.error('Problem with message search');
        this.router.navigate(['/home']);
        return of();
    })
    );
  }
}
