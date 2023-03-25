import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl='https:/localhost:5000/api/auth'

constructor(private http:HttpClient) { }
login(model:any): Observable<any> {
  return this.http.post(this.baseUrl + '/login', model).pipe(map((response:any)=>{
    const user = response;
    if(user) localStorage.setItem('token',user.token)
  } ))
}

}