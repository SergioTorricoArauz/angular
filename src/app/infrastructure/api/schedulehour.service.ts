import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserResponses} from '../../dto/user';

export interface ScheduleHour {
  id: number;
  scheduleId: number;
  daysOfWeek: string;
  startsTimeAt: string;
  endsTimeAt: string;
}
export interface ScheduleHourCreate {
  scheduleId?: number;
  daysOfWeek: string;
  hours: HourRange[];
}

export interface User {
  id: number;
  type: number;
  firstname: string;
  lastname: string;
  email: string;
  status: number;
  gender: string;
  bornAt: string; // o Date si lo vas a parsear
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
  createdAt: string; // o Date
  updatedAt: string; // o Date
}

export interface HourRange {
  startsTimeAt: string;
  endsTimeAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleHourService {
  private apiUrl = 'http://localhost:5000/api/schedulehours';
  private apiUrlBatch = 'http://localhost:5000/api/schedulehours/batch';
  private apiUrlBatchBy = 'http://localhost:5000/api/schedulehours/bySchedule';
  private apiUrlBatchByUser = 'http://localhost:5000/api/Users/by-service';

  constructor(private http: HttpClient) {}

  getScheduleHours(): Observable<ScheduleHour[]> {
    const headers = new HttpHeaders({
      Accept: 'text/plain', // Especificamos que queremos texto plano
    });

    return this.http.get<ScheduleHour[]>(this.apiUrl, { headers });
  }

  createSheduleHour(id: any[]): Observable<any> {
    return this.http.post<ScheduleHourCreate>(this.apiUrlBatch, id);
  }

  getSheduleHourByShedule(id: number): Observable<any> {
    return this.http.get<ScheduleHourCreate[]>(`${this.apiUrlBatchBy}/${id}`);
  }
  getSheduleHourBySheduleUser(id: number): Observable<any> {
    return this.http.get<User[]>(`${this.apiUrlBatchByUser}/${id}`);
  }
}
