import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  type: number;
  ehi: string;
  anayaId: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/Users';

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
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

  // Eliminar usuario por ID
  deleteUser(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log(`🗑️ Eliminando usuario con ID: ${id}, URL: ${url}`);

    return this.http.delete<void>(url).pipe(
      map(() => {
        console.log(`✅ Usuario con ID ${id} eliminado correctamente.`);
      })
    );
  }
}
