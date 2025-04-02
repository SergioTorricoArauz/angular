import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExceptionReason {
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
  private apiUrl = 'http://localhost:5000/api/ExceptionReasons';

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

  // Actualizar una razón de excepción por ID
  updateExceptionReason(
    id: number,
    data: Partial<ExceptionReason>
  ): Observable<ExceptionReason> {
    const url = `${this.apiUrl}/${id}`;
    console.log(`📝 Actualizando razón de excepción con ID: ${id}`, data);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<ExceptionReason>(url, data, { headers });
  }

  // Obtener una razón de excepción por ID
  getExceptionReasonById(id: number): Observable<ExceptionReason> {
    const url = `${this.apiUrl}/${id}`;
    console.log(`🔍 Obteniendo razón de excepción con ID: ${id} desde ${url}`);
    return this.http.get<ExceptionReason>(url);
  }
}
