import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../infrastructure/api/usuario.service';

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
    MatButtonModule,
  ],
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css'],
})
export class EditUsuarioComponent implements OnInit {
  constructor(
    private _router: Router,
    private _userService: UserService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.getUser(Number(id));
    }
  }

  tiposUsuario = ['Operador', 'Coordinador', 'Workforce', 'Supervisor'];
  esOperador = false;
  esCoordinador = false;
  esSupervisor = false;

  usuarioForm = new FormGroup({
    tipoUsuario: new FormControl<number>(0, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    nombre: new FormControl<string>('', {
      validators: [Validators.required, this.nombreValido],
      nonNullable: true,
    }),
    apellidos: new FormControl<string>('', {
      validators: [Validators.required, this.nombreValido],
      nonNullable: true,
    }),
    sexo: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    fechaNacimiento: new FormControl<Date | null>(null),
    correo: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    telefono: new FormControl<string>(''),
    direccion: new FormControl<string>(''),
    fechaAlta: new FormControl<Date | null>(null, Validators.required),
    fechaPiso: new FormControl<Date | null>(null),
    fechaBaja: new FormControl<Date | null>(null),
    servicioAsociado: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    supervisor: new FormControl<string>(''),
    coordinador: new FormControl<string>(''),
    dependientes: new FormControl<string>(''),
    usuarioWinConecta: new FormControl<string>(''),
    usuarioWinCliente: new FormControl<string>(''),
    eh: new FormControl<string>(''),
    idAvaya: new FormControl<string>(''),
    usuarioOrion: new FormControl<string>(''),
    usuarioRrss: new FormControl<string>(''),
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
    this.esOperador = tipo === 0;
    this.esCoordinador = tipo === 1;
    this.esSupervisor = tipo === 2;
  }

  guardarUsuario() {
    if (this.usuarioForm.valid) {
      console.log('Usuario guardado:', this.usuarioForm.value);
    } else {
      console.warn(
        'Formulario inválido. Por favor, completa los campos requeridos.'
      );
    }
  }

  // Método para obtener el usuario por ID y cargar los datos en el formulario
  getUser(id: number) {
    this._userService.findUser(id).subscribe((response) => {
      console.log(response);
      // Asignar valores al formulario
      this.usuarioForm.patchValue({
        tipoUsuario: response.type,
        nombre: response.firstname,
        apellidos: response.lastname,
        sexo: response.gender,
        fechaNacimiento: new Date(response.bornAt),
        correo: response.email,
        telefono: response.phone,
        direccion: response.address,
        fechaAlta: new Date(response.signupAt),
        fechaPiso: response.pisoAt ? new Date(response.pisoAt) : null,
        fechaBaja: response.quitAt ? new Date(response.quitAt) : null,
        servicioAsociado: response.serviceAssociated.toString(),
        supervisor: response.supervisorId
          ? response.supervisorId.toString()
          : '',
        coordinador: response.coordinatorId
          ? response.coordinatorId.toString()
          : '',
        dependientes: response.teamUsers?.map((user) => user.user).join(', '),
        usuarioWinConecta: response.winUsernameConecta,
        usuarioWinCliente: response.winUsernameClient,
        eh: response.eh,
        idAvaya: response.avayaId.toString(),
        usuarioOrion: response.orionUsername,
        usuarioRrss: response.rrssUsername,
      });
    });
  }
}
