import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserResponse, UserResponses } from '../../dto/user';

// ✅ Interfaz para obtener usuarios (datos reducidos)
export interface User {
  id: number;
  firstname: string;
  lastname: string;
  type: number;
  ehi: string;
  anayaId: number;
}

// ✅ Nueva interfaz: Para crear usuarios
export interface UserCreateRequest {
  type: number;
  firstname: string;
  lastname: string;
  email: string;
  status: number;
  gender: string;
  bornAt: string;
  country: string;
  phone: string;
  address: string;
  collaboratorId: number;
  serviceAssociated: number;
  coordinatorId: number;
  supervisorId: number;
  systemId: number;
  modeWork: number;
  winUsernameConecta: string;
  winUsernameClient: string;
  eh: string;
  avayaId: number;
  orionUsername: string;
  rrssUsername: string;
  serialComputer: string;
  serialMonitor: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/Users';

  constructor(private http: HttpClient) {}

  // ✅ Obtener todos los usuarios (Solo datos básicos)
  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      Accept: 'text/plain',
    });

    return this.http.get<User[]>(this.apiUrl, { headers }).pipe(
      map((users) =>
        users.map((user) => ({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          type: user.type,
          ehi: user.ehi,
          anayaId: user.anayaId,
        }))
      )
    );
  }

  // ✅ Nuevo método: Crear usuario (Usando la nueva interfaz `UserCreateRequest`)
  createUser(user: UserCreateRequest): Observable<UserCreateRequest> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<UserCreateRequest>(this.apiUrl, user, { headers });
  }

  // ✅ Eliminar usuario por ID
  deleteUser(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log(`🗑️ Eliminando usuario con ID: ${id}, URL: ${url}`);

    return this.http.delete<void>(url).pipe(
      map(() => {
        console.log(`✅ Usuario con ID ${id} eliminado correctamente.`);
      })
    );
  }

  findUser(id: number): Observable<UserResponses> {
    return this.http.get<UserResponses>(`${this.apiUrl}/${id}`);
  }
}
