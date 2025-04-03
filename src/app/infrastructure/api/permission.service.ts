import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Permission} from '../../domain/entities/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private readonly apyUrl: string = 'http://localhost:3000/api/Permission';

  constructor(private http: HttpClient) {}

  getPermissions(): Observable<Permission[]> {
  return this.http.get<Permission[]>(this.apyUrl);}

  getPermissionById(id: number): Observable<Permission>{
    return this.http.get<Permission>(`${this.apyUrl}/${id}`);
  }

  createPermission(permission: Partial<Permission>): Observable<Permission>{
    return this.http.post<Permission>(this.apyUrl, permission);
  }
}
