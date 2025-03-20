import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatDialog} from '@angular/material/dialog';
import {NuevoRolDialogComponent} from '../nuevo-rol-dialog/nuevo-rol-dialog.component';
import {EditRoleComponent} from '../edit-role/edit-role.component';

@Component({
  selector: 'app-roles-permisos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './roles-permisos.component.html',
  styleUrls: ['./roles-permisos.component.css']
})
export class RolesPermisosComponent {

  constructor(private dialog: MatDialog) {
  }
  displayedColumns: string[] = ['select', 'fechaCreacion', 'nombreRol', 'permisos', 'usuarios', 'estado', 'acciones'];
  dataSource = [
    { fecha: '24-11-2024', nombre: 'Administrador Super User', permisos: ['Crear marcaciones manuales', 'crear solicitudes', '+1'], usuarios: ['Roman Alvarez Hurtado'], estado: 'Active' },
    { fecha: '24-11-2024', nombre: 'Workforce test', permisos: ['Crear marcaciones manuales', 'crear solicitudes', '+1'], usuarios: ['Rodolfo Vaca Padilla', 'Germán Antelo'], estado: 'Inactive' },
    { fecha: '24-11-2024', nombre: 'Operador Regular', permisos: ['Crear marcaciones manuales', 'crear solicitudes', '+1'], usuarios: ['Juan Perez', 'Pedro Perez'], estado: 'Active' }
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('Filtro aplicado:', filterValue);
  }

  abrirModal() {
    const dialogRef = this.dialog.open(NuevoRolDialogComponent, {
      width: '1000px', // Puedes ajustar el tamaño
      data: { titulo: 'Nuevo Rol' } // Puedes pasar datos opcionales
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró con datos:', result);
    });
  }

  redictionEdit(id: number) {
    const dialogRef = this.dialog.open(EditRoleComponent, {
      width: '1000px', // Puedes ajustar el tamaño
      data: { titulo: 'Nuevo Rol' } // Puedes pasar datos opcionales
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró con datos:', result);
    });  }

}
