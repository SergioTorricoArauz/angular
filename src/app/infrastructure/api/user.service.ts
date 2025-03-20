import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRequest, UserResponse } from '../../dto/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl =
    'https://62ef-181-115-172-154.ngrok-free.app/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '1',
      }),
      withCredentials: true,
    };

    return this.http.get<UserResponse[]>(this.apiUrl, httpOptions);
  }

  createUser(user: UserRequest): Observable<UserResponse> {
    console.log(user);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<UserResponse>(this.apiUrl, user, httpOptions);
  }

  updateUser(
    id: number,
    user: Partial<UserResponse>
  ): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  findUser(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`);
  }
}
