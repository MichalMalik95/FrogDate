import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { EnvironmentInjector, Injectable, ɵɵqueryRefresh } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user';
import { PaginationResult } from '../models/pagination';
import { Message } from '../models/message';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl= environment.apiUrl;

constructor(private http:HttpClient,  ) { }

getUsers(page:number, itemsPerPage: number, userParams: any | null, likeParams: any | null )
:Observable<PaginationResult<User[]>>{

  const paginationResult: PaginationResult<User[]> = new PaginationResult<User[]>();

  let params = new HttpParams();

  if(page != null && itemsPerPage != null){
    params = params.append('pageNumber',page);
    params = params.append('pageSize',itemsPerPage)
  }

  if(userParams != null){
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('zodiacSign', userParams.zodiacSign);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
  }

  if(likeParams === "UserLikes"){
    params = params.append('UserLikes', 'true');

  }
  if(likeParams === "UserIsLiked"){
    params = params.append('UserIsLiked', 'true');

  }


  return this.http.get<User[]>(this.baseUrl + '/users', {observe: 'response', params}).pipe(

    map((response:HttpResponse<any>) =>{
      console.log(response);

      paginationResult.result = response?.body ?? [];

      if(response.headers.get('Pagination') != null){
        paginationResult.pagination =JSON.parse(response.headers.get('Pagination') || "");
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
  return this.http.delete(this.baseUrl+'/users/'+ userId +'/photos/'+id);
}

sendLike(id: number, recipientId:number){
  return this.http.post(this.baseUrl + '/users/' + id + '/likes/' + recipientId, {});
}

getMessages(id:number, page?: number, itemsPerPage?: number, messageContainer?: any | null )
{

  const paginationResult: PaginationResult<Message[]> = new PaginationResult<Message[]>();

  let params = new HttpParams();

  params = params.append('MessageContainer', messageContainer);

  if(page != null && itemsPerPage != null){
    params = params.append('pageNumber',page);
    params = params.append('pageSize',itemsPerPage);
  }

  return this.http.get<Message[]>(this.baseUrl + '/users/' + id + '/messages', {observe: 'response', params}).pipe(

    map((response:HttpResponse<any>) =>{
      console.log(response);

      paginationResult.result = response?.body ?? [];

      if(response.headers.get('Pagination') != null){
        paginationResult.pagination =JSON.parse(response.headers.get('Pagination') || "");
      }

      return paginationResult;
    })
    );
}
}
