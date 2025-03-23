import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {
  DependienteService,
  TeamCreateRequest,
} from '../../../infrastructure/api/dependiente.service';
import { NuevoEquipoComponent } from '../nuevo-equipo/nuevo-equipo.component';

@Component({
  selector: 'app-dependientes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  template: `
    <div class="container">
      <h2>Equipos / Crear equipos</h2>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Equipos *</mat-label>
        <mat-select formControlName="equipo">
          <mat-option *ngFor="let equipo of equipos" [value]="equipo">{{
            equipo
          }}</mat-option>
        </mat-select>
      </mat-form-field>
      <button
        mat-raised-button
        color="accent"
        class="add-btn"
        (click)="abrirModalNuevoEquipo()"
      >
        Añadir equipo
      </button>

      <h3>10 personas asignadas</h3>
      <mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <ng-container matColumnDef="select">
          <mat-header-cell *matHeaderCellDef></mat-header-cell>
          <mat-cell *matCellDef="let element">
            <mat-checkbox></mat-checkbox>
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="nombre">
          <mat-header-cell *matHeaderCellDef> Dependiente </mat-header-cell>
          <mat-cell *matCellDef="let element">{{ element.nombre }}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="idEmpleado">
          <mat-header-cell *matHeaderCellDef> ID Empleado </mat-header-cell>
          <mat-cell *matCellDef="let element">{{
            element.idEmpleado
          }}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="equipo">
          <mat-header-cell *matHeaderCellDef> Equipo </mat-header-cell>
          <mat-cell *matCellDef="let element">{{ element.equipo }}</mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
      </mat-table>

      <div class="buttons">
        <button mat-raised-button color="warn">Archivar Usuario</button>
        <button mat-raised-button color="primary" (click)="guardarFormulario()">
          Siguiente
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
      }
      .full-width {
        width: 100%;
      }
      .add-btn {
        margin: 10px 0;
      }
      .mat-table {
        width: 100%;
        margin-top: 20px;
      }
      .buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }
    `,
  ],
})
export class DependientesComponent implements OnInit {
  equipos: string[] = [];
  equipoForm = new FormGroup({
    equipo: new FormControl(''),
  });

  displayedColumns: string[] = ['select', 'nombre', 'idEmpleado', 'equipo'];
  dataSource = new MatTableDataSource<{
    nombre: string;
    idEmpleado: string;
    equipo: string;
  }>([]);

  constructor(
    private dependienteService: DependienteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEquipos();
  }

  abrirModalNuevoEquipo() {
    const dialogRef = this.dialog.open(NuevoEquipoComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((nuevoEquipo: string) => {
      if (nuevoEquipo) {
        const request: TeamCreateRequest = {
          name: nuevoEquipo,
          description: 'Equipo creado desde modal',
        };
        this.dependienteService.createEquipo(request).subscribe({
          next: () => {
            this.loadEquipos();
          },
          error: (err) => {
            console.error('[ERROR] Error al crear equipo:', err);
          },
        });
      }
    });
  }

  loadEquipos() {
    console.log('[INFO] Cargando equipos desde API...');
    this.dependienteService.getEquipos().subscribe({
      next: (data) => {
        console.log('[SUCCESS] Equipos recibidos:', data);
        this.equipos = [...new Set(data.map((e) => e.name))];
        console.log('[INFO] Equipos extraídos:', this.equipos);
      },
      error: (err) => {
        console.error('[ERROR] Error al cargar equipos:', err);
      },
    });
  }

  guardarFormulario() {
    console.log('Formulario guardado:', this.equipoForm.value);
  }
}
