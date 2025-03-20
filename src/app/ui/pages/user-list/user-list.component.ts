import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../infrastructure/api/usuario.service';
import { UserResponse } from '../../../dto/user';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatMenuModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  template: `
    <div class="container">
      <h2>Lista de Usuarios</h2>

      <div class="filters">
        <mat-form-field appearance="outline">
          <mat-label>Buscar</mat-label>
          <input
            matInput
            [(ngModel)]="searchTerm"
            (keyup)="applyFilter()"
            placeholder="Buscar por nombre o ID"
          />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Estado</mat-label>
          <mat-select
            [(ngModel)]="selectedStatus"
            (selectionChange)="applyFilter()"
          >
            <mat-option value="">Todos</mat-option>
            <mat-option *ngFor="let status of statuses" [value]="status">{{
              status
            }}</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <table mat-table [dataSource]="users" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nombre</th>
          <td mat-cell *matCellDef="let user">{{ user.firstname }}</td>
        </ng-container>

        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID Empleado</th>
          <td mat-cell *matCellDef="let user">{{ user.id }}</td>
        </ng-container>

        <ng-container matColumnDef="role">
          <th mat-header-cell *matHeaderCellDef>Rol</th>
          <td mat-cell *matCellDef="let user">{{ user.role }}</td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Estado</th>
          <td mat-cell *matCellDef="let user">{{ user.status }}</td>
        </ng-container>

        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Tipo de Empleado</th>
          <td mat-cell *matCellDef="let user">{{ user.type }}</td>
        </ng-container>

        <ng-container matColumnDef="acciones">
          <th mat-header-cell *matHeaderCellDef>Acciones</th>
          <td mat-cell *matCellDef="let user">
            <button mat-icon-button [matMenuTriggerFor]="menu">
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <button mat-menu-item (click)="redirectionEdit(user.id)">
                <mat-icon>edit</mat-icon> Editar
              </button>
              <button mat-menu-item (click)="deleteUser(user.id)">
                <mat-icon>delete</mat-icon> Eliminar
              </button>
            </mat-menu>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
  styles: [
    `
      .container {
        width: 100%;
        padding: 20px;
      }

      h2 {
        font-size: 24px;
        margin-bottom: 20px;
      }

      .filters {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
      }

      mat-form-field {
        width: 200px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 12px;
        text-align: left;
      }

      th {
        background-color: #f4f4f4;
        font-weight: bold;
      }

      tr:nth-child(even) {
        background-color: #f9f9f9;
      }

      button {
        cursor: pointer;
      }
    `,
  ],
})
export class UserListComponent implements OnInit {
  searchTerm: string = '';
  selectedStatus: string = '';

  statuses = ['Activo', 'Inactivo'];
  displayedColumns: string[] = [
    'name',
    'id',
    'role',
    'status',
    'type',
    'acciones',
  ];
  users = new MatTableDataSource<any>([]);

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('🟢 Componente UserListComponent inicializado');
    this.getUsers();
  }

  getUsers() {
    console.log('🔄 Iniciando llamada a la API para obtener usuarios...');

    this._userService.getUsers().subscribe(
      (apiUsers: any[]) => {
        console.log('✅ Datos crudos recibidos desde la API:', apiUsers);

        // Mapeo de los datos API a la estructura UserResponse
        this.users.data = apiUsers.map((user) => ({
          firstname: user.firstname ?? 'N/A',
          lastname: user.lastname ?? 'N/A',
          role: user.role ?? 'Sin Rol',
          type: user.type ?? 'Desconocido',
          id: user.id ?? 0,
          name:
            user.name ?? `${user.firstname ?? 'N/A'} ${user.lastname ?? 'N/A'}`,
          email: user.email ?? 'No disponible',
          status: user.status ?? 0,
          te: user.te ?? 0,
          createdAt: user.createdAt ?? 'Desconocido',
          updatedAt: user.updatedAt ?? 'N/A',
        }));

        console.log('📌 Datos procesados para la tabla:', this.users.data);
      },
      (error) => {
        console.error('❌ Error obteniendo usuarios:', error);
      }
    );
  }

  applyFilter() {
    console.log('🔍 Aplicando filtro:', this.searchTerm);
    this.users.filter = this.searchTerm.trim().toLowerCase();
  }

  redirectionEdit(id: number) {
    console.log('📝 Redirigiendo a la edición del usuario con ID:', id);
    this._router.navigate(['main-page/edit-user', id]);
  }

  deleteUser(id: number) {
    console.log('🗑️ Eliminando usuario con ID:', id);
    // Lógica para eliminar usuario
    this._userService.deleteUser(id).subscribe(
      () => {
        console.log(`✅ Usuario con ID ${id} eliminado correctamente`);
        this.getUsers(); // Recargar la lista de usuarios
      },
      (error) => {
        console.error(`❌ Error eliminando usuario con ID ${id}:`, error);
      }
    );
  }
}
