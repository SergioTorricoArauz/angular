import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Importar correctamente los módulos de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExceptionService } from '../../../infrastructure/api/exception.service';

@Component({
  selector: 'app-new-exception-dialog',
  standalone: true,
  imports: [
    CommonModule, // Importar CommonModule para usar directivas como *ngFor
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  template: `
    <h2 mat-dialog-title>Nuevo Tipo de Excepción</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Tipo de excepción</mat-label>
          <input
            matInput
            formControlName="title"
            placeholder="Nombre de la excepción"
          />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Descripción</mat-label>
          <textarea
            matInput
            formControlName="description"
            placeholder="Descripción de la excepción"
          ></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Estado</mat-label>
          <mat-select formControlName="status">
            <mat-option
              *ngFor="let option of statusOptions"
              [value]="option.value"
            >
              {{ option.label }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions class="dialog-actions">
      <button mat-button (click)="close()">Cancelar</button>
      <button
        mat-raised-button
        color="primary"
        (click)="create()"
        [disabled]="form.invalid"
      >
        Crear
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .full-width {
        width: 100%;
      }
      .dialog-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
      }
    `,
  ],
})
export class NewExceptionDialogComponent {
  form: FormGroup;
  statusOptions = [
    { value: 0, label: 'Inactivo' },
    { value: 1, label: 'Activo' },
    { value: 2, label: 'Pendiente' },
  ];

  constructor(
    private fb: FormBuilder,
    private exceptionReasonService: ExceptionService,
    private dialogRef: MatDialogRef<NewExceptionDialogComponent> // 👈 CAMBIA ESTO
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: [0, Validators.required], // Valor por defecto
    });
  }

  close(nombreExcepcion?: string): void {
    this.dialogRef.close(nombreExcepcion); // 👈 Cierra el modal y envía el dato
  }

  create(): void {
    if (this.form.valid) {
      this.exceptionReasonService
        .createExceptionReason(this.form.value)
        .subscribe(
          (response) => {
            console.log('✅ Excepción creada:', response);
            this.close(response.title); // 👈 Enviar el nombre al componente padre
          },
          (error) => {
            console.error('❌ Error al crear excepción:', error);
          }
        );
    }
  }
}
