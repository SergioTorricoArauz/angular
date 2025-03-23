import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleCreate, RoleResponse } from '../../dto/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly apiUrl = 'http://localhost:3000/api/Role';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<RoleCreate[]> {
    return this.http.get<RoleCreate[]>(this.apiUrl);
  }

  createRole(role: Partial<RoleCreate>): Observable<RoleCreate> {
    return this.http.post<RoleCreate>(this.apiUrl, role);
  }
}
