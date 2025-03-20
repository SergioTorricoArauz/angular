import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import {
  ScheduleHourService,
  ScheduleHour,
} from '../../../infrastructure/api/schedulehour.service';

@Component({
  selector: 'app-programacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  template: `
    <div class="contenedor">
      <h2>Programaciones</h2>

      <div class="filtros">
        <mat-form-field appearance="outline">
          <mat-label>Estado</mat-label>
          <mat-select [(ngModel)]="filtro.estado">
            <mat-option value="">Todos</mat-option>
            <mat-option *ngFor="let estado of estados" [value]="estado">{{
              estado
            }}</mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="aplicarFiltro()">
          Filtrar
        </button>
      </div>

      <button mat-raised-button color="accent" (click)="crearProgramacion()">
        Nueva Programación
      </button>

      <table mat-table [dataSource]="dataSource" matSort class="tabla">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>
          <td mat-cell *matCellDef="let element">{{ element.id }}</td>
        </ng-container>
        <ng-container matColumnDef="fechaInicio">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            Fecha Inicio
          </th>
          <td mat-cell *matCellDef="let element">
            {{ element.startTime | date : 'dd/MM/yyyy HH:mm' }}
          </td>
        </ng-container>
        <ng-container matColumnDef="fechaFin">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Fecha Fin</th>
          <td mat-cell *matCellDef="let element">
            {{ element.endTime | date : 'dd/MM/yyyy HH:mm' }}
          </td>
        </ng-container>
        <ng-container matColumnDef="estado">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Estado</th>
          <td mat-cell *matCellDef="let element">
            {{ element.estado || 'N/A' }}
          </td>
        </ng-container>
        <ng-container matColumnDef="acciones">
          <th mat-header-cell *matHeaderCellDef>Acciones</th>
          <td mat-cell *matCellDef="let element">
            <button mat-icon-button [matMenuTriggerFor]="menu">
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <button mat-menu-item (click)="editarProgramacion(element.id)">
                Editar
              </button>
              <button mat-menu-item (click)="archivarProgramacion(element.id)">
                Archivar
              </button>
            </mat-menu>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButtons
      ></mat-paginator>
    </div>
  `,
  styles: [
    `
      .contenedor {
        padding: 20px;
      }
      .filtros {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-bottom: 20px;
      }
      .tabla {
        width: 100%;
      }
    `,
  ],
})
export class ProgramacionComponent implements OnInit {
  estados = [
    'NUEVO',
    'OFERTADO',
    'ASIGNADO',
    'INICIADO',
    'FINALIZADO',
    'ANULADO',
  ];
  displayedColumns: string[] = [
    'id',
    'fechaInicio',
    'fechaFin',
    'estado',
    'acciones',
  ];
  dataSource = new MatTableDataSource<ScheduleHour>([]);
  filtro = { estado: '' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _router: Router,
    private scheduleHourService: ScheduleHourService
  ) {}

  ngOnInit() {
    this.obtenerProgramaciones();
  }

  obtenerProgramaciones() {
    this.scheduleHourService.getScheduleHours().subscribe(
      (data: ScheduleHour[]) => {
        console.log('✅ Programaciones obtenidas:', data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('❌ Error al obtener programaciones:', error);
      }
    );
  }

  aplicarFiltro() {
    console.log('🔍 Filtro aplicado:', this.filtro.estado);
    this.obtenerProgramaciones();
  }

  crearProgramacion() {
    this._router.navigate(['main-page/crear-programacion']);
  }

  editarProgramacion(id: number) {
    console.log('✏️ Editando programación:', id);
  }

  archivarProgramacion(id: number) {
    console.log('🗃️ Archivando programación:', id);
  }
}
