import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../../infrastructure/api/role.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nuevo-rol-add',
  templateUrl: './nuevo-rol-add.component.html',
  styleUrls: ['./nuevo-rol-add.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class NuevoRolAddComponent {
  rolForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    status: new FormControl<number>(1, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    private roleService: RoleService,
    private dialogRef: MatDialogRef<NuevoRolAddComponent>
  ) {}

  crearRol() {
    if (this.rolForm.valid) {
      this.roleService.createRole(this.rolForm.value).subscribe({
        next: (res) => {
          this.dialogRef.close(res); // Envía el resultado al cerrar
        },
        error: (err) => {
          console.error('❌ Error al crear rol:', err);
          alert('Error al crear rol');
        },
      });
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}
