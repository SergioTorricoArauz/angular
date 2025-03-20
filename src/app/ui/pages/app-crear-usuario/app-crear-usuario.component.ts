import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {EditRoleComponent} from '../edit-role/edit-role.component';
import {MatDialog} from '@angular/material/dialog';
import {NuevoRolDialogComponent} from '../nuevo-rol-dialog/nuevo-rol-dialog.component';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './app-crear-usuario.component.html',
  styleUrls: ['./app-crear-usuario.component.css']
})
export class AppCrearUsuarioComponent {

  constructor(private dialog: MatDialog) {
  }
  tiposUsuario = ['Operador', 'Coordinador', 'Workforce', 'Supervisor'];
  esOperador = false;
  esCoordinador = false;
  esSupervisor = false;

  usuarioForm = new FormGroup({
    tipoUsuario: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    nombre: new FormControl<string>('', { validators: [Validators.required, this.nombreValido], nonNullable: true }),
    apellidos: new FormControl<string>('', { validators: [Validators.required, this.nombreValido], nonNullable: true }),
    sexo: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    fechaNacimiento: new FormControl<Date | null>(null),
    correo: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    telefono: new FormControl<string>(''),
    direccion: new FormControl<string>(''),
    fechaAlta: new FormControl<Date | null>(null, Validators.required),
    fechaPiso: new FormControl<Date | null>(null),
    fechaBaja: new FormControl<Date | null>(null),
    servicioAsociado: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    supervisor: new FormControl<string>(''),
    coordinador: new FormControl<string>(''),
    dependientes: new FormControl<string>(''),
    usuarioWinConecta: new FormControl<string>(''),
    usuarioWinCliente: new FormControl<string>(''),
    eh: new FormControl<string>(''),
    idAvaya: new FormControl<string>(''),
    usuarioOrion: new FormControl<string>(''),
    usuarioRrss: new FormControl<string>('')
  });

  nombreValido(control: AbstractControl): ValidationErrors | null {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
    if (control.value && !regex.test(control.value.trim())) {
      return { nombreInvalido: true };
    }
    return null;
  }

  onTipoUsuarioChange() {
    const tipo = this.usuarioForm.get('tipoUsuario')?.value;
    this.esOperador = tipo === 'Operador';
    this.esCoordinador = tipo === 'Coordinador';
    this.esSupervisor = tipo === 'Supervisor';
  }

  guardarUsuario() {
    if (this.usuarioForm.valid) {
      console.log('Usuario guardado:', this.usuarioForm.value);
    } else {
      console.warn('Formulario inválido. Por favor, completa los campos requeridos.');
    }
  }

  redictionEdit() {
    const dialogRef = this.dialog.open(NuevoRolDialogComponent, {
      width: '1000px', // Puedes ajustar el tamaño
      data: { titulo: 'Nuevo Rol' } // Puedes pasar datos opcionales
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró con datos:', result);
    });  }

}
