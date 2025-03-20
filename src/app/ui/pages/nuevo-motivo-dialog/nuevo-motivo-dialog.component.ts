import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nuevo-motivo-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './nuevo-motivo-dialog.component.html',
  styleUrls: ['./nuevo-motivo-dialog.component.css']
})
export class NuevoMotivoDialogComponent {
  motivoForm = new FormGroup({
    concepto: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<NuevoMotivoDialogComponent>) {}

  cerrarDialog(): void {
    this.dialogRef.close();
  }

  guardarMotivo(): void {
    if (this.motivoForm.valid) {
      console.log('Nuevo Motivo:', this.motivoForm.value);
      this.dialogRef.close(this.motivoForm.value);
    } else {
      console.log('Formulario inválido.');
    }
  }
}
