import { Component, OnInit, Input, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ExceptionService,
  ExceptionReason,
} from '../../../infrastructure/api/exception.service';

@Component({
  selector: 'app-edit-exception',
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
      <h2>Editar Excepción</h2>

      <form (ngSubmit)="updateException()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Tipo de Excepción</mat-label>
          <input matInput [(ngModel)]="exception.title" name="title" required />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Descripción</mat-label>
          <textarea
            matInput
            [(ngModel)]="exception.description"
            name="description"
            required
          ></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Estado</mat-label>
          <mat-select [(ngModel)]="exception.status" name="status" required>
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
  styleUrls: ['./edit-exception.component.css'],
})
export class EditExceptionComponent implements OnInit {
  exception: ExceptionReason = {
    title: '', description: '', status: 0,
    id: 0,
    createdAt: '',
    updatedAt: null
  };

  constructor(
    private exceptionService: ExceptionService,
    private dialogRef: MatDialogRef<EditExceptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    if (this.data?.id) {
      this.loadException(this.data.id);
    }
  }

  loadException(id: number) {
    this.exceptionService.getExceptionReasonById(id).subscribe((res) => {
      this.exception = res;
    });
  }

  updateException() {
    this.exceptionService
      .updateExceptionReason(this.data.id, this.exception)
      .subscribe(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
