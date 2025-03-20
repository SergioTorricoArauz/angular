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
import { NuevoClienteComponent } from '../nuevo-cliente/nuevo-cliente.component';
import { ClienteService } from '../../../infrastructure/api/cliente.service';
import { ClientI } from '../../../dto/clienti';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface ClienteTableItem {
  id: number;
  fechaCreacion: string;
  nombreCliente: string;
  tipoMarcacion: string;
  campania: string;
  estado: string;
}
@Component({
  selector: 'app-clientes',
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
    MatProgressBarModule,
  ],
  template: `
    <div class="contenedor">
      <h2>Clientes</h2>

      <mat-progress-bar
        *ngIf="isLoading"
        mode="indeterminate"
      ></mat-progress-bar>

      <div class="filtros">
        <mat-form-field appearance="outline">
          <mat-label>Buscar Cliente</mat-label>
          <input
            matInput
            (keyup)="applyFilter($event)"
            placeholder="Nombre del Cliente"
          />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Estado</mat-label>
          <mat-select [(ngModel)]="filtro.estado">
            <mat-option value="">Todos</mat-option>
            <mat-option
              *ngFor="let estado of ['Activo', 'Inactivo']"
              [value]="estado"
              >{{ estado }}</mat-option
            >
          </mat-select>
        </mat-form-field>

        <button mat-raised-button color="primary" (click)="loadClients()">
          <mat-icon>filter_alt</mat-icon> Filtrar
        </button>
      </div>

      <button
        mat-raised-button
        color="accent"
        (click)="abrirModalNuevoCliente()"
      >
        <mat-icon>person_add</mat-icon> Nuevo Cliente
      </button>

      <table
        mat-table
        [dataSource]="dataSource"
        matSort
        class="tabla"
        *ngIf="dataSource.data.length > 0"
      >
        <ng-container matColumnDef="fechaCreacion">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            Fecha de Creación
          </th>
          <td mat-cell *matCellDef="let element">
            {{ element.fechaCreacion }}
          </td>
        </ng-container>

        <ng-container matColumnDef="nombreCliente">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            Nombre del Cliente
          </th>
          <td mat-cell *matCellDef="let element">
            {{ element.nombreCliente }}
          </td>
        </ng-container>

        <ng-container matColumnDef="tipoMarcacion">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            Tipo de Marcación
          </th>
          <td mat-cell *matCellDef="let element">
            {{ element.tipoMarcacion }}
          </td>
        </ng-container>

        <ng-container matColumnDef="campania">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Campaña</th>
          <td mat-cell *matCellDef="let element">{{ element.campania }}</td>
        </ng-container>

        <ng-container matColumnDef="estado">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Estado</th>
          <td mat-cell *matCellDef="let element">
            <span
              [ngClass]="{
                activo: element.estado === 'Activo',
                inactivo: element.estado === 'Inactivo'
              }"
            >
              {{ element.estado }}
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
              <button mat-menu-item (click)="editarCliente(element.id)">
                <mat-icon>edit</mat-icon> Editar
              </button>
              <button mat-menu-item (click)="deleteClient(element.id)">
                <mat-icon>delete</mat-icon> Eliminar
              </button>
            </mat-menu>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <div
        *ngIf="dataSource.data.length === 0 && !isLoading"
        class="mensaje-no-datos"
      >
        <mat-icon>info</mat-icon> No hay clientes disponibles.
      </div>

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
      .mensaje-no-datos {
        display: flex;
        align-items: center;
        justify-content: center;
        color: gray;
        font-size: 18px;
        margin-top: 20px;
      }
      .activo {
        color: green;
        font-weight: bold;
      }
      .inactivo {
        color: red;
        font-weight: bold;
      }
    `,
  ],
})
export class ClientesComponent implements OnInit {
  displayedColumns: string[] = [
    'fechaCreacion',
    'nombreCliente',
    'tipoMarcacion',
    'campania',
    'estado',
    'acciones',
  ];
  dataSource = new MatTableDataSource<ClienteTableItem>([]);
  isLoading = false;
  filtro = { estado: '' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.isLoading = true;
    this.clienteService.getClients().subscribe(
      (data: ClientI[]) => {
        const formattedData: ClienteTableItem[] = data.map((cliente) => ({
          id: cliente.id,
          fechaCreacion: new Date(cliente.createdAt).toLocaleDateString(),
          nombreCliente: cliente.name,
          tipoMarcacion: cliente.description ?? 'N/A', // Si no hay descripción, se coloca 'N/A'
          campania: cliente.address ?? 'N/A', // Si no hay dirección, se coloca 'N/A'
          estado: cliente.status === 1 ? 'Activo' : 'Inactivo',
        }));

        this.dataSource.data = formattedData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      (error) => {
        console.error('❌ Error al obtener clientes:', error);
        this.isLoading = false;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  abrirModalNuevoCliente() {
    const dialogRef = this.dialog.open(NuevoClienteComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadClients();
    });
  }

  editarCliente(id: number) {
    console.log('Editar cliente:', id);
  }

  archivarCliente(id: number) {
    console.log('Archivar cliente:', id);
  }

  deleteClient(id: number) {
    if (confirm(`¿Seguro que deseas eliminar el cliente con ID ${id}?`)) {
      this.clienteService.deleteClient(id).subscribe(
        () => {
          console.log(`✅ Cliente con ID ${id} eliminado correctamente.`);
          this.loadClients(); // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('❌ Error al eliminar cliente:', error);
        }
      );
    }
  }
}
