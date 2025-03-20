import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {AppCrearUsuarioComponent} from '../app-crear-usuario/app-crear-usuario.component';
import {DependientesComponent} from '../dependientes/dependientes.component';
import {RolesComponent} from '../roles/roles.component';

@Component({
  selector: 'app-user-stepper',
  standalone: true,
  imports: [CommonModule, MatStepperModule, MatButtonModule, DependientesComponent, RolesComponent, AppCrearUsuarioComponent, DependientesComponent, RolesComponent],
  template: `
    <mat-horizontal-stepper #stepper>
      <mat-step label="General">
        <app-crear-usuario></app-crear-usuario>
        <button mat-button (click)="stepper.next()">Siguiente</button>
      </mat-step>
      <mat-step label="Dependientes">
        <app-dependientes></app-dependientes>
        <button mat-button (click)="stepper.previous()">Atrás</button>
        <button mat-button (click)="stepper.next()">Siguiente</button>
      </mat-step>
      <mat-step label="Roles">
        <app-roles></app-roles>
        <button mat-button (click)="stepper.previous()">Atrás</button>
        <button mat-button color="primary">Guardar</button>
      </mat-step>
    </mat-horizontal-stepper>
  `,
  styleUrls: ['./user-stepper.component.css']
})
export class UserStepperComponent {}
