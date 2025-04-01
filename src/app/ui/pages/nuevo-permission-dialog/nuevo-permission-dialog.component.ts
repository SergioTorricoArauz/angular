import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PermissionService } from '../../../infrastructure/api/permission.service';

@Component({
  selector: 'app-nuevo-permission-dialog',
  standalone: true,
  templateUrl: './nuevo-permission-dialog.component.html',
  styleUrls: ['./nuevo-permission-dialog.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class NuevoPermissionDialogComponent implements OnInit {
  permissionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NuevoPermissionDialogComponent>,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.permissionForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: [0, Validators.required]
    });
  }

  cerrarDialog(): void {
    this.dialogRef.close();
  }

  guardarPermiso(): void {
    if (this.permissionForm.valid) {
      this.permissionService.createPermission(this.permissionForm.value).subscribe({
        next: (permission) => {
          console.log('Permiso creado:', permission);
          this.dialogRef.close(permission);
        },
        error: (err) => {
          console.error('Error al crear el permiso:', err);
        }
      });
    }
  }
}
