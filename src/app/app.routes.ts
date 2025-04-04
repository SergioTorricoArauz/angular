import { Routes } from '@angular/router';
import { MainPageComponent } from './ui/components/main-page/main-page.component';
import { UserListComponent } from './ui/pages/user-list/user-list.component';
import { LoginComponent } from './ui/pages/login/login.component';
import {AppCrearUsuarioComponent} from './ui/pages/app-crear-usuario/app-crear-usuario.component';
import {RolesPermisosComponent} from './ui/pages/roles-permisos/roles-permisos.component';
import {MotivoHoraExtraComponent} from './ui/pages/motivo-hora-extra/motivo-hora-extra.component';
import {NuevoRolDialogComponent} from './ui/pages/nuevo-rol-dialog/nuevo-rol-dialog.component';
import {NuevoMotivoDialogComponent} from './ui/pages/nuevo-motivo-dialog/nuevo-motivo-dialog.component';
import {EditUsuarioComponent} from './ui/pages/edit-usuario/edit-usuario.component';
import {RecuperarPasswordComponent} from './ui/pages/recuperar-password/recuperar-password.component';
import {NewPasswordComponent} from './ui/pages/new-password/new-password.component';
import {EditRoleComponent} from './ui/pages/edit-role/edit-role.component';
import {EditMotiveComponent} from './ui/pages/edit-motive/edit-motive.component';
import {CrearProgramacionComponent} from './ui/pages/crear-programacion/crear-programacion.component';
import {ClientesComponent} from './ui/pages/clientes/clientes.component';
import {ServiciosComponent} from './ui/pages/servicios/servicios.component';
import {ExceptionListComponent} from './ui/pages/exception-list/exception-list.component';
import {UserStepperComponent} from './ui/pages/user-stepper/user-stepper.component';
import { GestionHorarioComponent } from './ui/pages/gestion-horario/gestion-horario.component';
import { MiHorarioComponent } from './ui/pages/mi-horario/mi-horario.component';
import {AsignacionComponent} from './ui/pages/asignacion/asignacion.component';
import {EditProgramacionComponent} from './ui/pages/edit-programacion/edit-programacion.component';
import {ProgramacionComponent} from './ui/pages/programacion/programacion.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-pass', component: RecuperarPasswordComponent },
  { path: 'new-pass', component: NewPasswordComponent },
  {
    path: 'main-page',
    component: MainPageComponent,
    children: [
      { path: 'user-list', component: UserListComponent },
      { path: 'create-user', component: AppCrearUsuarioComponent },
      { path: 'rol-permiso', component: RolesPermisosComponent },
      { path: 'hora-extra', component: MotivoHoraExtraComponent },
      { path: 'nuevo-rol-dialog', component: NuevoRolDialogComponent },
      { path: 'nuevo-motivo-dialog', component: NuevoMotivoDialogComponent },
      { path: 'programacion', component: ProgramacionComponent },
      { path: 'crear-programacion', component: CrearProgramacionComponent },
      { path: 'client-list', component: ClientesComponent },
      { path: 'service-list', component: ServiciosComponent },
      { path: 'user-stepper', component: UserStepperComponent },
      { path: 'excepciones-list', component: ExceptionListComponent },
      { path: 'asignacion-programacion', component: AsignacionComponent },
      { path: 'edit-user/:id', component: EditUsuarioComponent },
      { path: 'edit-role/:id', component: EditRoleComponent },
      { path: 'edit-motive/:id', component: EditMotiveComponent },
      { path: 'gestion-horario', component: GestionHorarioComponent },
      { path: 'mi-horario', component: MiHorarioComponent },
      { path: 'edit-programacion/:id', component: EditProgramacionComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige al login por defecto
  { path: '**', redirectTo: 'login' }
];
