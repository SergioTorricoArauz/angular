import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NuevoMotivoDialogComponent} from '../nuevo-motivo-dialog/nuevo-motivo-dialog.component';

@Component({
  selector: 'app-edit-motive',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule
  ],
  templateUrl: './edit-motive.component.html',
  styleUrl: './edit-motive.component.css'
})
export class EditMotiveComponent {
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
