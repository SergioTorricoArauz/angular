import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {NuevoRolDialogComponent} from '../nuevo-rol-dialog/nuevo-rol-dialog.component';

@Component({
  selector: 'app-edit-role',
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
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css'
})
export class EditRoleComponent {
  rolForm = new FormGroup({
    nombreRol: new FormControl('', Validators.required),
    permisos: new FormControl([]), // Ahora se almacenan en `mat-select` con múltiples valores
    dependiente: new FormControl('')
  });

  permisosDisponibles = ['Crear Solicitudes', 'Editar Roles', 'Eliminar Usuarios'];
  usuariosAsignados = [
    { nombre: 'Lucía Perez', id: '#23454GH6JYT6', tipo: 'Operador Regular' },
    { nombre: 'Edson Wes', id: '#23454GH6JYT6', tipo: 'Operador Regular' },
    { nombre: 'Edson Wes', id: '#23454GH6JYT6', tipo: 'Operador Regular' }
  ];

  displayedColumns: string[] = ['select', 'nombre', 'id', 'tipo', 'acciones'];

  constructor(
    public dialogRef: MatDialogRef<NuevoRolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cerrarDialog(): void {
    this.dialogRef.close();
  }

  guardarRol(): void {
    console.log('Nuevo Rol:', this.rolForm.value);
    this.dialogRef.close(this.rolForm.value);
  }
}
