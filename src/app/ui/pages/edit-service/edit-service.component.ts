import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ServicioService,
  ServiceRequest,
  ServiceResponse,
} from '../../../infrastructure/api/servicio.service';

@Component({
  selector: 'app-edit-service',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
  ],
  template: `
    <div class="modal-container">
      <h2>Editar Servicio</h2>

      <form (ngSubmit)="updateService()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nombre del Servicio</mat-label>
          <input matInput [(ngModel)]="service.name" name="name" required />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Descripción</mat-label>
          <textarea
            matInput
            [(ngModel)]="service.description"
            name="description"
            required
          ></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Estado</mat-label>
          <mat-select [(ngModel)]="service.status" name="status" required>
            <mat-option value="Activo">Activo</mat-option>
            <mat-option value="Inactivo">Inactivo</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Campaña ID</mat-label>
          <input
            matInput
            type="number"
            [(ngModel)]="service.campaignId"
            name="campaignId"
            required
          />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Subcampaña</mat-label>
          <input
            matInput
            [(ngModel)]="service.subCampaign"
            name="subCampaign"
            required
          />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Cliente ID</mat-label>
          <input
            matInput
            type="number"
            [(ngModel)]="service.clientId"
            name="clientId"
            required
          />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Tipo de Servicio ID</mat-label>
          <input
            matInput
            type="number"
            [(ngModel)]="service.serviceTypeId"
            name="serviceTypeId"
            required
          />
        </mat-form-field>

        <div class="buttons">
          <button mat-button (click)="closeDialog()">Cancelar</button>
          <button mat-raised-button color="primary" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./edit-service.component.css'],
})
export class EditServiceComponent implements OnInit {
  service: ServiceRequest = {
    name: '',
    description: '',
    status: '',
    campaignId: 0,
    subCampaign: '',
    clientId: 0,
    serviceTypeId: 0,
  };

  constructor(
    private servicioService: ServicioService,
    private dialogRef: MatDialogRef<EditServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    if (this.data?.id) {
      this.loadService(this.data.id);
    }
  }

  loadService(id: number) {
    this.servicioService
      .getServiceById(id)
      .subscribe((res: ServiceResponse) => {
        this.service = {
          name: res.name,
          description: res.description,
          status: res.status,
          campaignId: res.campaignId,
          subCampaign: res.subCampaign,
          clientId: res.clientId,
          serviceTypeId: res.serviceTypeId,
        };
      });
  }

  updateService() {
    this.servicioService.updateService(this.data.id, this.service).subscribe(
      () => {
        this.closeDialog(this.service.name); // Enviar el nombre del servicio al cerrar
      },
      (error) => {
        console.error('Error al actualizar el servicio:', error);
      }
    );
  }

  closeDialog(nombreServicio?: string) {
    this.dialogRef.close(nombreServicio); // Enviar el nombre del servicio al cerrar el modal
  }
}
