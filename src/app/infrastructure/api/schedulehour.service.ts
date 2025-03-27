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
  scheduleId: number;
  daysOfWeek: string;
  startsTimeAt: string;
  endsTimeAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleHourService {
  private apiUrl = 'http://localhost:3000/api/schedulehours';

  constructor(private http: HttpClient) {}

  getScheduleHours(): Observable<ScheduleHour[]> {
    const headers = new HttpHeaders({
      Accept: 'text/plain', // Especificamos que queremos texto plano
    });

    return this.http.get<ScheduleHour[]>(this.apiUrl, { headers });
  }


  createSheduleHour(id: ScheduleHourCreate): Observable<any> {
    return this.http.post<ScheduleHourCreate>(this.apiUrl, id);
  }
}
