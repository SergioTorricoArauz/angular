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
import { UserService, User } from '../../../infrastructure/api/usuario.service';
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
      <h2>Usuarios</h2>

      <div class="filters">
        <mat-form-field appearance="outline">
          <mat-label>Buscar</mat-label>
          <input
            matInput
            [(ngModel)]="searchTerm"
            (keyup)="applyFilter()"
            placeholder="Buscar"
          />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Estado</mat-label>
          <mat-select
            [(ngModel)]="selectedStatus"
            (selectionChange)="applyFilter()"
          >
            <mat-option value="">Todos</mat-option>
            <mat-option *ngFor="let status of statuses" [value]="status">
              {{ status }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Tipo de Empleado</mat-label>
          <mat-select
            [(ngModel)]="selectedType"
            (selectionChange)="applyFilter()"
          >
            <mat-option value="">Todos</mat-option>
            <mat-option *ngFor="let type of employeeTypes" [value]="type">
              {{ type }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <button mat-button color="primary" (click)="filterUsers()">
          <mat-icon>filter_alt</mat-icon> Filtro
        </button>

        <button mat-button color="warn" (click)="exportUsers()">
          <mat-icon>cloud_download</mat-icon> Exportar
        </button>

        <button mat-button color="accent" (click)="addUser()">
          <mat-icon>person_add</mat-icon> Nuevo Empleado
        </button>
      </div>

      <table mat-table [dataSource]="users" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nombre</th>
          <td mat-cell *matCellDef="let user">
            <span class="avatar"
              >{{ user.firstname[0] }}{{ user.lastname[0] }}</span
            >
            {{ user.firstname }} {{ user.lastname }}
          </td>
        </ng-container>

        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID Empleado</th>
          <td mat-cell *matCellDef="let user">{{ user.id }}</td>
        </ng-container>

        <ng-container matColumnDef="role">
          <th mat-header-cell *matHeaderCellDef>Rol</th>
          <td mat-cell *matCellDef="let user" class="role">
            <span
              [ngClass]="{ admin: user.type === 1, operator: user.type !== 1 }"
            >
              {{ user.type === 1 ? 'Admin' : 'Operador' }}
            </span>
          </td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Estado</th>
          <td mat-cell *matCellDef="let user">
            <span
              class="status"
              [ngClass]="{
                active: user.ehi === '1',
                inactive: user.ehi !== '1'
              }"
            >
              {{ user.ehi === '1' ? 'Active' : 'Inactive' }}
            </span>
          </td>
        </ng-container>

        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Tipo de Empleado</th>
          <td mat-cell *matCellDef="let user">
            {{ user.anayaId === 1 ? 'Operador Regular' : 'Workforce' }}
          </td>
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
        align-items: center;
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

      .avatar {
        background-color: #ccc;
        color: white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
      }

      .role {
        font-weight: bold;
      }

      .status {
        padding: 5px 10px;
        border-radius: 10px;
        color: white;
      }

      .active {
        background-color: green;
      }

      .inactive {
        background-color: red;
      }
    `,
  ],
})
export class UserListComponent implements OnInit {
  searchTerm: string = '';
  selectedStatus: string = '';
  selectedType: string = '';

  statuses = ['Activo', 'Inactivo'];
  employeeTypes = ['Operador Regular', 'Workforce'];
  displayedColumns: string[] = [
    'name',
    'id',
    'role',
    'status',
    'type',
    'acciones',
  ];
  users = new MatTableDataSource<User>([]);

  constructor(private _router: Router, private _userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe((apiUsers) => {
      this.users.data = apiUsers;
    });
  }

  applyFilter() {
    this.users.filter = this.searchTerm.trim().toLowerCase();
  }

  filterUsers() {
    console.log('Aplicando filtro...');
  }

  exportUsers() {
    console.log('Exportando usuarios...');
  }

  addUser() {
    this._router.navigate(['main-page/user-stepper']);
  }

  redirectionEdit(id: number) {
    this._router.navigate(['main-page/edit-user', id]);
  }

  deleteUser(id: number) {
    this._userService.deleteUser(id).subscribe(() => this.getUsers());
  }
}
