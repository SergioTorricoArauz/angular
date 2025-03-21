import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ServicioService } from '../../../infrastructure/api/servicio.service';

@Component({
  selector: 'app-nuevo-servicio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  template: `
    <div class="modal-container">
      <h2>Nuevo Servicio</h2>
      <form>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nombre del Servicio</mat-label>
          <input matInput [(ngModel)]="servicio.name" name="name" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Descripción</mat-label>
          <textarea
            matInput
            [(ngModel)]="servicio.description"
            name="description"
          ></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Estado</mat-label>
          <mat-select [(ngModel)]="servicio.status" name="status">
            <mat-option *ngFor="let estado of estados" [value]="estado">{{
              estado
            }}</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Campaña ID</mat-label>
          <input
            matInput
            type="number"
            [(ngModel)]="servicio.campaignId"
            name="campaignId"
          />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Subcampaña</mat-label>
          <input
            matInput
            [(ngModel)]="servicio.subCampaign"
            name="subCampaign"
          />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Cliente ID</mat-label>
          <input
            matInput
            type="number"
            [(ngModel)]="servicio.clientId"
            name="clientId"
          />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Tipo de Servicio ID</mat-label>
          <input
            matInput
            type="number"
            [(ngModel)]="servicio.serviceTypeId"
            name="serviceTypeId"
          />
        </mat-form-field>

        <div class="acciones">
          <button mat-stroked-button (click)="cancelar()">Cerrar</button>
          <button
            mat-raised-button
            color="primary"
            (click)="guardarServicio()"
            [disabled]="
              !servicio.name || !servicio.clientId || !servicio.serviceTypeId
            "
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .modal-container {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        max-width: 400px;
      }
      .full-width {
        width: 100%;
      }
      .acciones {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }
    `,
  ],
})
export class NuevoServicioComponent {
  servicio = {
    name: '',
    description: '',
    status: '',
    campaignId: 0,
    subCampaign: '',
    clientId: 0,
    serviceTypeId: 0,
  };

  estados = ['Activo', 'Inactivo'];

  constructor(
    private dialogRef: MatDialogRef<NuevoServicioComponent>,
    private servicioService: ServicioService
  ) {}

  cancelar() {
    this.dialogRef.close();
  }

  guardarServicio() {
    this.servicioService.createService(this.servicio).subscribe(
      (response) => {
        console.log('Servicio guardado:', response);
        this.dialogRef.close(this.servicio.name);
      },
      (error) => {
        console.error('Error al guardar servicio:', error);
      }
    );
  }
}
