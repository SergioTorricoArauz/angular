import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ClienteService,
  ClientResponse,
} from '../../../infrastructure/api/cliente.service';

@Component({
  selector: 'app-edit-client',
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
      <h2>Editar Cliente</h2>

      <form (ngSubmit)="updateClient()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nombre</mat-label>
          <input matInput [(ngModel)]="client.name" name="name" required />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Descripción</mat-label>
          <textarea
            matInput
            [(ngModel)]="client.description"
            name="description"
            required
          ></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Dirección</mat-label>
          <input
            matInput
            [(ngModel)]="client.address"
            name="address"
            required
          />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Estado</mat-label>
          <mat-select [(ngModel)]="client.status" name="status" required>
            <mat-option [value]="1">Activo</mat-option>
            <mat-option [value]="0">Inactivo</mat-option>
          </mat-select>
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
  styles: [
    `
      .modal-container {
        padding: 20px;
        width: 100%;
        max-width: 400px;
      }
      .full-width {
        width: 100%;
      }
      .buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }
    `,
  ],
})
export class EditClientComponent implements OnInit {
  client: Partial<ClientResponse> = {
    name: '',
    description: '',
    address: '',
    status: 1, // Estado por defecto
  };

  constructor(
    private clienteService: ClienteService,
    private dialogRef: MatDialogRef<EditClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    if (this.data?.id) {
      this.loadClient(this.data.id);
    }
  }

  loadClient(id: number) {
    this.clienteService.getClientById(id).subscribe((res) => {
      this.client = res;
    });
  }

  updateClient() {
    this.clienteService
      .updateClient(this.data.id, this.client)
      .subscribe(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogRef.close(true); // Cierra el modal y devuelve un resultado para actualizar la lista
  }
}
