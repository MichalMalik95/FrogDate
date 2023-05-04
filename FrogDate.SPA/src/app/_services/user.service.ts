import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl= environment.apiUrl;

constructor(private http:HttpClient,  ) { }

getUsers():Observable<User[]>{
  return this.http.get<User[]>(this.baseUrl+'/users');
}
getUser(id:number): Observable<User>{
  return this.http.get<User>(this.baseUrl+'/users/'+id);
}
updateUser(id:number,user:User): Observable<any>{
   return this.http.put(this.baseUrl+'/users/'+id,user);
}
}
