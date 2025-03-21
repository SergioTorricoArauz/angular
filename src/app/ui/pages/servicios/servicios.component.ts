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
import { MatDialog } from '@angular/material/dialog';
import { NuevoServicioComponent } from '../nuevo-servicio/nuevo-servicio.component';
import {
  ServicioService,
  ServicioTableItem,
} from '../../../infrastructure/api/servicio.service';
import { EditServiceComponent } from '../edit-service/edit-service.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-servicios',
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
      <h2>Servicios</h2>
      <div class="filtros">
        <mat-form-field appearance="outline">
          <mat-label>Cliente</mat-label>
          <mat-select [(ngModel)]="filtro.cliente">
            <mat-option value="">Todos</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Campaña</mat-label>
          <mat-select [(ngModel)]="filtro.campania">
            <mat-option value="">Todos</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Subcampaña</mat-label>
          <mat-select [(ngModel)]="filtro.subcampania">
            <mat-option value="">Todos</mat-option>
          </mat-select>
        </mat-form-field>
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
      <button
        mat-raised-button
        color="accent"
        (click)="abrirModalNuevoServicio()"
      >
        Nuevo Servicio
      </button>

      <table mat-table [dataSource]="dataSource" matSort class="tabla">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>
          <td mat-cell *matCellDef="let element">{{ element.id }}</td>
        </ng-container>
        <ng-container matColumnDef="createdAt">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            Fecha de Creación
          </th>
          <td mat-cell *matCellDef="let element">
            {{ element.createdAt | date : 'dd/MM/yyyy' }}
          </td>
        </ng-container>
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Nombre</th>
          <td mat-cell *matCellDef="let element">{{ element.name }}</td>
        </ng-container>
        <ng-container matColumnDef="campaignId">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Campaña</th>
          <td mat-cell *matCellDef="let element">
            Campaña {{ element.campaignId }}
          </td>
        </ng-container>
        <ng-container matColumnDef="subCampaign">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Subcampaña</th>
          <td mat-cell *matCellDef="let element">{{ element.subCampaign }}</td>
        </ng-container>
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Estado</th>
          <td mat-cell *matCellDef="let element">
            <span
              [ngClass]="{
                activo: element.status === '1',
                inactivo: element.status === '0'
              }"
            >
              {{ element.status === '1' ? 'Activo' : 'Inactivo' }}
            </span>
          </td>
        </ng-container>
        <ng-container matColumnDef="acciones">
          <th mat-header-cell *matHeaderCellDef>Acciones</th>
          <td mat-cell *matCellDef="let element">
            <button mat-icon-button [matMenuTriggerFor]="menu">
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <button mat-menu-item (click)="editarServicio(element.id)">
                <mat-icon>edit</mat-icon> Editar
              </button>
              <button mat-menu-item (click)="eliminarServicio(element.id)">
                <mat-icon>delete</mat-icon> Eliminar
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
export class ServiciosComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'createdAt',
    'name',
    'campaignId',
    'subCampaign',
    'status',
    'acciones',
  ];
  dataSource = new MatTableDataSource<ServicioTableItem>([]);
  estados = ['Activo', 'Inactivo'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filtro = {
    cliente: '',
    campania: '',
    subcampania: '',
    estado: '',
  };

  constructor(
    private dialog: MatDialog,
    private servicioService: ServicioService
  ) {}

  ngOnInit() {
    this.loadServices();
  }

  // ✅ Obtener servicios desde la API
  loadServices() {
    this.servicioService.getServices().subscribe(
      (data: ServicioTableItem[]) => {
        this.dataSource = new MatTableDataSource<ServicioTableItem>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('❌ Error al obtener servicios:', error);
      }
    );
  }

  aplicarFiltro() {
    console.log('Aplicar filtros');
  }

  abrirModalNuevoServicio() {
    const dialogRef = this.dialog.open(NuevoServicioComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((nombreServicio) => {
      if (nombreServicio) {
        // Si hay un nombre, significa que se creó correctamente
        this.loadServices(); // Recargar la lista de servicios

        // Mostrar el modal de confirmación con el nombre del servicio creado
        this.dialog.open(ConfirmDialogComponent, {
          width: '400px',
          data: {
            title: 'Servicio Creado',
            message: `El servicio "${nombreServicio}" ha sido creado con éxito.`,
          },
        });
      }
    });
  }

  // ✅ Eliminar un servicio
  eliminarServicio(id: number) {
    // Primero obtener el servicio para obtener su nombre
    this.servicioService.getServiceById(id).subscribe((servicio) => {
      const nombreServicio = servicio.name; // Guardar el nombre del servicio

      if (
        confirm(`¿Estás seguro de eliminar el servicio "${nombreServicio}"?`)
      ) {
        this.servicioService.deleteService(id).subscribe(
          () => {
            console.log(`✅ Servicio "${nombreServicio}" eliminado.`);
            this.loadServices(); // Recargar la lista

            // Mostrar la ventana de éxito con el nombre del servicio eliminado
            this.dialog.open(ConfirmDialogComponent, {
              width: '400px',
              data: {
                title: 'Servicio Eliminado',
                message: `El servicio "${nombreServicio}" ha sido eliminado correctamente.`,
              },
            });
          },
          (error) => {
            console.error('❌ Error al eliminar servicio:', error);
          }
        );
      }
    });
  }

  // Método para editar un servicio
  editarServicio(id: number) {
    console.log('✏️ Editar servicio:', id);

    // Abrir el modal de edición con los datos del servicio seleccionado
    const dialogRef = this.dialog.open(EditServiceComponent, {
      width: '450px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((nombreServicio) => {
      if (nombreServicio) {
        // Si hay un nombre, significa que se editó correctamente
        this.loadServices(); // Recargar la lista después de editar

        // Mostrar la ventana de confirmación con el nombre del servicio
        this.dialog.open(ConfirmDialogComponent, {
          width: '400px',
          data: {
            title: 'Servicio Actualizado',
            message: `El servicio "${nombreServicio}" ha sido actualizado con éxito.`,
          },
        });
      }
    });
  }
}
