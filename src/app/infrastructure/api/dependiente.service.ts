import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Team {
  id: number;
  name: string;
  description: string;
  users: User[];
}

export interface User {
  id: string;
  fullname: string;
}

export interface DependienteItem {
  dependiente: string;
  empleadoId: string;
  equipo: string;
}

export interface TeamCreateRequest {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class DependienteService {
  private readonly apiUrl = 'http://localhost:3000/api/Team';

  constructor(private http: HttpClient) {}

  getEquipos(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }

  getDependientes(): Observable<DependienteItem[]> {
    return this.http.get<Team[]>(this.apiUrl).pipe(
      map((teams) => {
        return teams.flatMap((team) =>
          team.users.map((user) => ({
            dependiente: user.fullname,
            empleadoId: `#${user.id}`,
            equipo: team.name,
          }))
        );
      })
    );
  }

  createEquipo(team: Partial<TeamCreateRequest>): Observable<TeamCreateRequest> {
    return this.http.post<TeamCreateRequest>(this.apiUrl, team);
  }
}
