import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserService, User } from '../../../infrastructure/api/usuario.service';
import { PermissionService } from '../../../infrastructure/api/permission.service';
import { RoleService } from '../../../infrastructure/api/role.service';
import { RoleCreate } from '../../../dto/role';
import { NuevoPermissionDialogComponent } from '../nuevo-permission-dialog/nuevo-permission-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-nuevo-rol-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
  ],
  templateUrl: './nuevo-rol-dialog.component.html',
  styleUrls: ['./nuevo-rol-dialog.component.css']
})
export class NuevoRolDialogComponent implements OnInit, AfterViewInit {
  rolForm = new FormGroup({
    nombreRol: new FormControl<string>('', Validators.required),
    permisos: new FormControl<number[]>([])
  });

  permisosDisponibles: { id: number; name: string }[] = [];
  usuariosAsignados: (User & { selected?: boolean })[] = [];
  displayedColumns: string[] = ['select', 'firstname', 'id', 'type', 'acciones'];
  dataSource = new MatTableDataSource<(User & { selected?: boolean })>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<NuevoRolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadPermissions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.usuariosAsignados = users.map(user => ({ ...user, selected: false }));
        this.dataSource.data = this.usuariosAsignados;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      }
    });
  }

  loadPermissions(): void {
    this.permissionService.getPermissions().subscribe({
      next: (permissions) => {
        this.permisosDisponibles = permissions;
      },
      error: (err) => {
        console.error('Error al cargar permisos:', err);
      }
    });
  }

  cerrarDialog(): void {
    this.dialogRef.close();
  }

  guardarRol(): void {
    const selectedUsers = this.usuariosAsignados
      .filter(u => u.selected)
      .map(u => u.id);

    const nombreRol = this.rolForm.get('nombreRol')?.value;
    const selectedPermissions = this.rolForm.get('permisos')?.value || [];

    console.log('Permisos seleccionados (IDs):', selectedPermissions);

    const newRole: Partial<RoleCreate> = {
      name: nombreRol ?? '',
      description: '',
      status: 0
    };

    this.roleService.createRole(newRole).subscribe({
      next: (createdRole) => {
        this.roleService.createRolePermission(createdRole.id!, selectedPermissions).subscribe({
          next: () => {
            this.dialog.open(ConfirmDialogComponent, {
              width: '400px',
              data: {
                title: '¡Rol creado!',
                message: `El rol "${createdRole.name}" se creó exitosamente.`
              }
            });
            this.dialogRef.close({ ...createdRole, userIds: selectedUsers });
          },
          error: (err) => console.error('[ERROR] Permisos no asignados:', err)
        });
      },
      error: (err) => console.error('[ERROR] No se pudo crear el rol:', err)
    });
  }

  openCreatePermissionDialog(): void {
    const dialogRef = this.dialog.open(NuevoPermissionDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadPermissions();
      }
    });
  }

  onPermissionsChange(event: any): void {
    const selected = event.value;
    console.log('📌 Permisos seleccionados (IDs):', selected);
    this.rolForm.get('permisos')?.setValue(selected);
  }
}
