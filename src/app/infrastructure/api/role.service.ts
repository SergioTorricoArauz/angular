import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RoleRequest, RoleResponse} from '../../dto/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly apiUrl = '/role';

  constructor(private http: HttpClient) {}

  getRoles(params: RoleRequest): Observable<RoleResponse[]> {
    let httpParams = new HttpParams();

    if (params.st !== undefined) {
      httpParams = httpParams.append('st', params.st.toString());
    }
    if (params.nm) {
      httpParams = httpParams.append('nm', params.nm);
    }
    if (params.pr) {
      httpParams = httpParams.append('pr', params.pr);
    }

    return this.http.get<RoleResponse[]>(this.apiUrl, { params: httpParams });
  }

  createRole(role: Partial<RoleResponse>): Observable<RoleResponse> {
    return this.http.post<RoleResponse>(this.apiUrl, role);
  }
}
