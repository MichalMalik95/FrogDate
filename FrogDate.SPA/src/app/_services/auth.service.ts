import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { Token } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl=environment.apiUrl+'/auth';
  jwthelper=new JwtHelperService;
  decodedToken:any;
  currentUser:User;
  photoUrl= new BehaviorSubject<string>('../../assets/User_Icon.PNG');
  currentPhotoUr=this.photoUrl.asObservable();


constructor(private http:HttpClient) { }

changeUserPhoto(photoUrl:string){
  this.photoUrl.next(photoUrl);

}

login(model:any): Observable<any> {
  return this.http.post(this.baseUrl + '/login', model).pipe(map((response:any)=>{
    const user = response;
    if(user) {
      localStorage.setItem('token',user.token);
      localStorage.setItem('user',JSON.stringify(user.user));
      this.decodedToken=this.jwthelper.decodeToken(user.token);
      console.log(this.decodedToken);
      this.currentUser=user.user;
      this.changeUserPhoto(this.currentUser.photoUrl);
  }
  } ));
}
register(user:User){
  return this.http.post(this.baseUrl+'/register',user)
}
loggedIn(){
  const token=localStorage.getItem('token');
  return !this.jwthelper.isTokenExpired(token);

}

}
