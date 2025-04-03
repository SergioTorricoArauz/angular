import { Component } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { NuevoRolDialogComponent } from '../nuevo-rol-dialog/nuevo-rol-dialog.component';
import { Router } from '@angular/router';
import {
  UserService,
  UserCreateRequest,
} from '../../../infrastructure/api/usuario.service';
import {ServicioTableItem} from '../../../domain/entities/serviciotableitem';
import {ServicioService} from '../../../infrastructure/api/servicio.service';

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
    MatButtonModule,
  ],
  templateUrl: './app-crear-usuario.component.html',
  styleUrls: ['./app-crear-usuario.component.css'],
})
export class AppCrearUsuarioComponent {
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private servicioService: ServicioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.servicioService.getServices().subscribe((data: ServicioTableItem[]) => {
      this.servicios = data;
    });
  }

  tiposUsuario = ['Operador', 'Coordinador', 'Workforce', 'Supervisor'];
  esOperador = false;
  esCoordinador = false;
  esSupervisor = false;
  imagenPreview: string | null = null;
  imagenSeleccionada: File | null = null;
  servicios: ServicioTableItem[] = [];

  usuarioForm = new FormGroup({
    tipoUsuario: new FormControl<string>('', {
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
    this.esOperador = tipo === 'Operador';
    this.esCoordinador = tipo === 'Coordinador';
    this.esSupervisor = tipo === 'Supervisor';
  }


  guardarUsuario() {
    if (this.usuarioForm.valid) {
      const nuevoUsuario: UserCreateRequest = {
        type: this.getUserType(this.usuarioForm.get('tipoUsuario')?.value || ''),
        firstname: this.usuarioForm.get('nombre')?.value || '',
        lastname: this.usuarioForm.get('apellidos')?.value || '',
        email: this.usuarioForm.get('correo')?.value || '',
        status: 1,
        gender: this.usuarioForm.get('sexo')?.value || '',
        bornAt: this.usuarioForm.get('fechaNacimiento')?.value?.toISOString().split('T')[0] || '',
        country: 'España',
        phone: this.usuarioForm.get('telefono')?.value || '',
        address: this.usuarioForm.get('direccion')?.value || '',
        collaboratorId: 0,
        serviceAssociated: Number(this.usuarioForm.get('servicioAsociado')?.value) || 0,
        coordinatorId: Number(this.usuarioForm.get('coordinador')?.value) || 0,
        supervisorId: Number(this.usuarioForm.get('supervisor')?.value) || 0,
        systemId: 0,
        modeWork: 0,
        winUsernameConecta: this.usuarioForm.get('usuarioWinConecta')?.value || '',
        winUsernameClient: this.usuarioForm.get('usuarioWinCliente')?.value || '',
        eh: this.usuarioForm.get('eh')?.value || '',
        avayaId: Number(this.usuarioForm.get('idAvaya')?.value) || 0,
        orionUsername: this.usuarioForm.get('usuarioOrion')?.value || '',
        rrssUsername: this.usuarioForm.get('usuarioRrss')?.value || '',
        serialComputer: 'N/A',
        serialMonitor: 'N/A',
      };

      this.userService.createUser(nuevoUsuario).subscribe({
        next: (response) => {
          console.log('✅ Usuario creado correctamente:', response);
          alert('Usuario creado exitosamente');
          this.usuarioForm.reset();
        },
        error: (error) => {
          console.error('❌ Error al crear usuario:', error);
          alert('Error al crear el usuario');
        },
      });
    } else {
      console.warn('⚠️ Formulario inválido. Por favor, completa los campos requeridos.');
    }
  }

  getUserType(tipo: string): number {
    const tipos = {
      Operador: 1,
      Coordinador: 2,
      Workforce: 3,
      Supervisor: 4,
    } as const;
    return tipos[tipo as keyof typeof tipos] || 0;
  }

  redictionEdit() {
    const dialogRef = this.dialog.open(NuevoRolDialogComponent, {
      width: '1000px',
      data: { titulo: 'Nuevo Rol' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('El modal se cerró con datos:', result);
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imagenSeleccionada = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
