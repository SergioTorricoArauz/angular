import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../../../infrastructure/api/cliente.service';

@Component({
  selector: 'app-nuevo-cliente',
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
      <h2>Nuevo Cliente</h2>
      <form>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nombre del Cliente</mat-label>
          <input matInput [(ngModel)]="cliente.name" name="name" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Descripción</mat-label>
          <textarea
            matInput
            [(ngModel)]="cliente.description"
            name="description"
          ></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Dirección</mat-label>
          <input matInput [(ngModel)]="cliente.address" name="address" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Estado</mat-label>
          <mat-select [(ngModel)]="cliente.status" name="status">
            <mat-option
              *ngFor="let option of statusOptions"
              [value]="option.value"
            >
              {{ option.label }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <div class="acciones">
          <button mat-stroked-button (click)="cancelar()">Cancelar</button>
          <button
            mat-raised-button
            color="primary"
            (click)="crearCliente()"
            [disabled]="!cliente.name || !cliente.address"
          >
            Crear
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
export class NuevoClienteComponent {
  cliente = {
    name: '',
    description: '',
    address: '',
    status: 0,
  };

  statusOptions = [
    { value: 0, label: 'Inactivo' },
    { value: 1, label: 'Activo' },
  ];

  constructor(
    private dialogRef: MatDialogRef<NuevoClienteComponent>,
    private clienteService: ClienteService
  ) {}

  cancelar() {
    this.dialogRef.close();
  }

  crearCliente() {
    this.clienteService.createClient(this.cliente).subscribe(
      (response) => {
        console.log('Cliente creado:', response);
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error al crear cliente:', error);
      }
    );
  }
}
