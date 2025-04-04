import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define la interfaz de la respuesta que se espera desde el API
export interface Schedule {
  id?: number;
  name: string;
  description: string;
  status: string;
  campaignId: number;
  clientId: number;
  serviceId: number;
  hoursAssigned: number;
  operatorsCountMale: number;
  operatorsCountFemale: number;
  serviceTypeId: number;
  startAt: Date;
  endsAt: Date;
}


@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private apiUrl = 'http://localhost:3000/api/Schedule'; // URL de la API

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de las programaciones (schedules)
  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.apiUrl);
  }

  getSchedulesById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.apiUrl}/${id}`);
  }

  createSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.apiUrl, schedule);
  }
}
