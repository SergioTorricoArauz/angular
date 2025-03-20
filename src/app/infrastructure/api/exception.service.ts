import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ExceptionReason {
  id: number;
  title: string;
  description: string;
  status: number;
  createdAt: string;
  updatedAt: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ExceptionService {
  private apiUrl = 'http://localhost:3000/api/ExceptionReasons';

  constructor(private http: HttpClient) {}

  // Método para crear una nueva razón de excepción
  createExceptionReason(data: ExceptionReason): Observable<ExceptionReason> {
    return this.http.post<ExceptionReason>(this.apiUrl, data);
  }

  // Método para obtener todas las razones de excepción
  getExceptionReasons(): Observable<ExceptionReason[]> {
    return this.http.get<ExceptionReason[]>(this.apiUrl);
  }

  // Método para eliminar una razón de excepción
  deleteExceptionReason(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
