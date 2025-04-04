import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { UserService } from '../../../infrastructure/api/usuario.service';

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
    FormsModule,
  ],
  template: `
    <div class="container">
      <h2>Equipos / Crear equipos</h2>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Equipos *</mat-label>
        <mat-select formControlName="equipo">
          <mat-option *ngFor="let equipo of equipos" [value]="equipo">
            {{ equipo }}
          </mat-option>
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

      <h3>{{ dataSource.data.length }} personas asignadas</h3>
      <mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <ng-container matColumnDef="select">
          <mat-header-cell *matHeaderCellDef></mat-header-cell>
          <mat-cell *matCellDef="let element">
            <mat-checkbox [(ngModel)]="element.selected"></mat-checkbox>
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="nombre">
          <mat-header-cell *matHeaderCellDef> Dependiente </mat-header-cell>
          <mat-cell *matCellDef="let element">{{ element.nombre }}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="idEmpleado">
          <mat-header-cell *matHeaderCellDef> ID Empleado </mat-header-cell>
          <mat-cell *matCellDef="let element">
            {{ element.idEmpleado }}
          </mat-cell>
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
        <button mat-raised-button color="primary">
          Siguiente
        </button>
        <button mat-raised-button color="accent" (click)="onSeleccionar()">
          Obtener seleccionados
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
    selected: boolean;
    nombre: string;
    idEmpleado: number;
    equipo: string;
  }>([]);

  constructor(
    private dependienteService: DependienteService,
    private dialog: MatDialog,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadEquipos();
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe((apiUsers) => {
      const mappedUsers = apiUsers.map((user: any) => ({
        nombre: `${user.firstname} ${user.lastname}`,
        idEmpleado: user.id,
        equipo: 'Sin equipo',
        selected: false,
      }));
      this.dataSource = new MatTableDataSource(mappedUsers);
      console.log(mappedUsers, 'Usuarios mapeados para la tabla!');
    });
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
          next: (response:TeamCreateRequest) => {
            if(!response.id) return;
            this.loadEquipos();
            this.guardarFormulario(response.id)
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

  getSeleccionados(): number[] {
    return this.dataSource.data
      .filter((user) => user.selected)
      .map((user) => user.idEmpleado);
  }

  onSeleccionar() {
    const seleccionados = this.getSeleccionados();
    console.log('IDs seleccionados:', seleccionados);
  }


  guardarFormulario(teamId: number) {
    this.dependienteService
      .asignarUsuariosATeam(1, '1', this.getSeleccionados())
      .subscribe({
        next: (res) => console.log('Usuarios asignados correctamente', res),
        error: (err) => console.error('Error al asignar usuarios', err),
      });
    console.log('Formulario guardado:', this.equipoForm.value);  }
}
