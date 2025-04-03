import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

import { RoleService } from '../../../infrastructure/api/role.service';
import { RoleCreate } from '../../../dto/role';

import { NuevoRolDialogComponent } from '../nuevo-rol-dialog/nuevo-rol-dialog.component';
import { EditRoleComponent } from '../edit-role/edit-role.component';

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
export class RolesPermisosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'fechaCreacion', 'nombreRol', 'permisos', 'usuarios', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadRoles() {
    this.roleService.getRoles().subscribe({
      next: (roles: RoleCreate[]) => {
        this.dataSource.data = roles.map(role => ({
          id: role.id,
          fecha: new Date(role.createdAt || new Date()).toLocaleDateString(),
          nombre: role.name,
          permisos: role.rolePermissions?.map((p: any) => p.permission.name) || ['N/A'],
          usuarios: role.userRoles?.map((u: any) => u.user?.fullname) || [],
          estado: role.status === 1 ? 'Active' : 'Inactive'
        }));
      },
      error: (err) => {
        console.error('[ERROR] No se pudieron cargar los roles:', err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  abrirModal() {
    const dialogRef = this.dialog.open(NuevoRolDialogComponent, {
      width: '1000px',
      data: { titulo: 'Nuevo Rol' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró con datos:', result);
      if (result) this.loadRoles();
    });
  }

  redictionEdit(id: number) {
    const dialogRef = this.dialog.open(EditRoleComponent, {
      width: '1000px',
      data: { titulo: 'Editar Rol', id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró con datos:', result);
      if (result) this.loadRoles();
    });
  }

  eliminarRol(id: number) {
    if (confirm(`¿Seguro que deseas eliminar este rol con ID ${id}?`)) {
      this.roleService.deleteRole(id).subscribe({
        next: () => {
          console.log('Rol eliminado');
          this.loadRoles();
        },
        error: (err) => {
          console.error('[ERROR] No se pudo eliminar el rol:', err);
        }
      });
    }
  }
}
