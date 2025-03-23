import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import {
  DependienteService,
  TeamCreateRequest,
} from '../../../infrastructure/api/dependiente.service';

@Component({
  selector: 'app-nuevo-equipo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './nuevo-equipo.component.html',
  styleUrl: './nuevo-equipo.component.css',
})
export class NuevoEquipoComponent {
  nuevoEquipo: TeamCreateRequest = {
    name: '',
    description: '',
  };

  constructor(
    private dependienteService: DependienteService,
    private dialogRef: MatDialogRef<NuevoEquipoComponent>
  ) {}

  guardarEquipo() {
    if (!this.nuevoEquipo.name.trim()) return;

    this.dependienteService.createEquipo(this.nuevoEquipo).subscribe({
      next: () => {
        this.dialogRef.close(this.nuevoEquipo.name);
      },
      error: (err) => {
        console.error('[ERROR] Error al crear equipo:', err);
      },
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
