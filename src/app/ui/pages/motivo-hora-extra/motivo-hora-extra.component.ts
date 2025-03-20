import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {NuevoRolDialogComponent} from '../nuevo-rol-dialog/nuevo-rol-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {NuevoMotivoDialogComponent} from '../nuevo-motivo-dialog/nuevo-motivo-dialog.component';
import {EditMotiveComponent} from '../edit-motive/edit-motive.component';

@Component({
  selector: 'app-motivos-horas-extras',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './motivo-hora-extra.component.html',
  styleUrls: ['./motivo-hora-extra.component.css']
})
export class MotivoHoraExtraComponent {

  constructor(private dialog: MatDialog) {
  }

  displayedColumns: string[] = ['select', 'fechaCreacion', 'concepto', 'estado', 'acciones'];
  dataSource = [
    { fecha: '24-11-2024', concepto: 'Reprogramación de calendario', estado: 'Active' },
    { fecha: '24-11-2024', concepto: 'Baja médica', estado: 'Inactive' },
    { fecha: '24-11-2024', concepto: 'Solicitud directa del superior', estado: 'Active' },
    { fecha: '24-11-2024', concepto: 'Compensación de horas del operador', estado: 'Active' },
    { fecha: '24-11-2024', concepto: 'Motivo XYZ 5', estado: 'Active' },
    { fecha: '24-11-2024', concepto: 'Motivo XYZ 6', estado: 'Active' },
    { fecha: '24-11-2024', concepto: 'Motivo XYZ 7', estado: 'Active' },
    { fecha: '24-11-2024', concepto: 'Motivo XYZ 8', estado: 'Active' }
  ];

  abrirModal() {
    const dialogRef = this.dialog.open(NuevoMotivoDialogComponent, {
      width: '1000px', // Puedes ajustar el tamaño
      data: { titulo: 'Nuevo Rol' } // Puedes pasar datos opcionales
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró con datos:', result);
    });
  }

  abrirModalEditMotive(id: number) {
    const dialogRef = this.dialog.open(EditMotiveComponent, {
      width: '1000px', // Puedes ajustar el tamaño
      data: { titulo: 'Nuevo Rol' } // Puedes pasar datos opcionales
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró con datos:', result);
    });
  }
}
