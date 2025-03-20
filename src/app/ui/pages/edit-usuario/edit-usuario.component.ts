import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../infrastructure/api/user.service';

@Component({
  selector: 'app-edit-usuario',
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
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.css'
})
export class EditUsuarioComponent implements OnInit {

  constructor(private _router: Router, private _userService: UserService, private _route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.getUser(Number(id));
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

  getUser(id: number) {
    this._userService.findUser(1).subscribe(response => {
      console.log(response);
    })
  }
}
