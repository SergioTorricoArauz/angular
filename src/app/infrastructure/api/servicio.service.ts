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

export interface ServiceResponse {
  id: number;
  name: string;
  description: string;
  status: string;
  campaignId: number;
  subCampaign: string;
  clientId: number;
  serviceTypeId: number;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private apiUrl = 'http://localhost:5000/api/Service';

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

  getServiceById(id: number): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(`${this.apiUrl}/${id}`);
  }

  updateService(id: number, data: ServiceRequest): Observable<ServiceRequest> {
    return this.http.put<ServiceRequest>(`${this.apiUrl}/${id}`, data);
  }
}
export type { ServicioTableItem };

