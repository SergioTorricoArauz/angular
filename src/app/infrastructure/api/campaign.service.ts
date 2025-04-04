import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Campaign {
  id: number; // El ID de la campaña
  name: string; // El nombre de la campaña
  description: string; // Descripción de la campaña
  status: number; // El estado de la campaña
}

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private apiUrl = 'http://localhost:5000/api/Campaign'; // URL de la API

  constructor(private http: HttpClient) {}

  /**
   * Método para obtener todas las campañas desde la API
   * @returns Observable que emite el array de campañas
   */
  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.apiUrl);
  }

  getCampaignById(id: number): Observable<Campaign> {
    const url = `${this.apiUrl}/${id}`; // URL con el id dinámico
    return this.http.get<Campaign>(url);
  }
}
