import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientI } from '../../dto/clienti';

interface Client {
  name: string;
  description: string;
  address: string;
  status: number;
}

export interface ClientResponse {
  id: number;
  name: string;
  description: string;
  address: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}


@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:5000/api/Clients';

  constructor(private http: HttpClient) {}

  createClient(data: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, data);
  }

  getClients(): Observable<ClientI[]> {
    return this.http.get<ClientI[]>(this.apiUrl);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getClientById(id: number): Observable<ClientResponse> {
    return this.http.get<ClientResponse>(`${this.apiUrl}/${id}`);
  }

  updateClient(id: number, data: Partial<Client>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, {
      name: data.name,
      description: data.description,
      address: data.address,
      status: data.status,
    });
  }
}
