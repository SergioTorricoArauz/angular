import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioTableItem } from '../../domain/entities/serviciotableitem';

export interface ServiceRequest {
  name: string;
  description: string;
  status: string;
  campaignId: number;
  subCampaign: string;
  clientId: number;
  serviceTypeId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private apiUrl = 'http://localhost:3000/api/Service';

  constructor(private http: HttpClient) {}

  createService(data: ServiceRequest): Observable<ServiceRequest> {
    return this.http.post<ServiceRequest>(this.apiUrl, data);
  }

  getServices(): Observable<ServicioTableItem[]> {
    return this.http.get<ServicioTableItem[]>(this.apiUrl);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
export type { ServicioTableItem };

