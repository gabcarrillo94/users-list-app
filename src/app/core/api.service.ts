import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/index";
import { ApiResponse } from "../model/api.response";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://reqres.in/api/users';

  getUsers(page: number) : Observable<ApiResponse> {
    return this.http.get<ApiResponse>( this.baseUrl + '?page=' + page);
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + '/' + id);
  }
}
