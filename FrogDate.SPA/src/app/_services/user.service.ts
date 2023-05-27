import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvironmentInjector, Injectable, ɵɵqueryRefresh } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user';
import { PaginationResult } from '../models/pagination';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl= environment.apiUrl;

constructor(private http:HttpClient,  ) { }

getUsers(page:number, itemsPerPage: number)
:Observable<PaginationResult<User[]>>{

  var paginationResult: PaginationResult<User[]> = new PaginationResult<User[]>();

  let params = new HttpParams();

  if(page != null && itemsPerPage != null){
    params = params.append('pageNumber',page);
    params = params.append('pageSize',itemsPerPage)
  }


  return this.http.get<User[]>(this.baseUrl + '/users', {observe: 'response', params}).pipe(
    map(response =>{

      paginationResult.result = response?.body ?? [];

      if(response.headers.get('Pagination') != null){
        paginationResult.pagination =JSON.parse(response.headers.get('pagination') || '{}')
      }

      return paginationResult;
    })
  );
}
getUser(id:number): Observable<User>{
  return this.http.get<User>(this.baseUrl+'/users/'+id);
}
updateUser(id:number,user:User): Observable<any>{
   return this.http.put(this.baseUrl+'/users/'+id,user);
}

setMainPhoto(userId:number,id:number){
  return this.http.post(this.baseUrl+ '/users/'+userId+"/photos/"+id+"/setMain", {});
}

deletePhoto(userId:number,id:number){
  return this.http.delete(this.baseUrl+'/users/'+userId+'/photos/'+id);
}
}
