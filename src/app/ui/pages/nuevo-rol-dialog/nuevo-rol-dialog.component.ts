import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserService, User } from '../../../infrastructure/api/usuario.service';
import {PermissionService} from '../../../infrastructure/api/permission.service';
import {NuevoPermissionDialogComponent} from '../nuevo-permission-dialog/nuevo-permission-dialog.component';

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
export class NuevoRolDialogComponent implements OnInit {
  rolForm = new FormGroup({
    nombreRol: new FormControl('', Validators.required),
    permisos: new FormControl([]),
    dependiente: new FormControl('')
  });

  permisosDisponibles: string[] = [];
  usuariosAsignados: User[] = [];
  displayedColumns: string[] = ['select', 'firstname', 'id', 'type', 'acciones'];

  constructor(
    public dialogRef: MatDialogRef<NuevoRolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private permissionService: PermissionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadPermissions();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.usuariosAsignados = users;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      }
    });
  }

  loadPermissions(): void {
    this.permissionService.getPermissions().subscribe({
      next: (permissions) => {
        this.permisosDisponibles = permissions.map(permissions => permissions.name);
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
    console.log('Nuevo Rol:', this.rolForm.value);
    this.dialogRef.close(this.rolForm.value);
  }

  openCreatePermissionDialog(): void {
    const dialogRef = this.dialog.open(NuevoPermissionDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: any) => { // Declarar el tipo del parámetro result
      if (result) {
        this.loadPermissions(); // Recargar permisos después de crear uno nuevo
      }
    });
  }
}
