import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatIconModule
  ],
  template: `
    <div class="container">
      <h2>Usuario / Editar Usuario</h2>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Roles *</mat-label>
        <mat-select formControlName="rolSeleccionado">
          <mat-option *ngFor="let rol of roles" [value]="rol">{{ rol }}</mat-option>
        </mat-select>
      </mat-form-field>
      <button mat-raised-button color="primary" class="add-btn" (click)="agregarRol()">+ Añadir</button>

      <h3>10 Roles asignados</h3>
      <mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <ng-container matColumnDef="select">
          <mat-header-cell *matHeaderCellDef></mat-header-cell>
          <mat-cell *matCellDef="let element">
            <mat-checkbox></mat-checkbox>
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="nombre">
          <mat-header-cell *matHeaderCellDef> Rol </mat-header-cell>
          <mat-cell *matCellDef="let element">{{ element.nombre }}</mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>

      <mat-paginator [length]="100" [pageSize]="10"></mat-paginator>

      <div class="buttons">
        <button mat-raised-button color="warn">Archivar Usuario</button>
        <button mat-raised-button color="primary" (click)="guardarRoles()">Guardar</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .full-width {
      width: 100%;
    }
    .add-btn {
      margin: 10px 0;
    }
    .mat-table {
      width: 100%;
      margin-top: 20px;
    }
    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
  `]
})
export class RolesComponent {
  roles = ['Reportería', 'Encargado nal de operadores', 'ROL ABC'];
  displayedColumns: string[] = ['select', 'nombre'];
  dataSource = [
    { nombre: 'Reportería' },
    { nombre: 'Encargado nal de operadores' },
    { nombre: 'ROL ABC' }
  ];

  rolForm = new FormGroup({
    rolSeleccionado: new FormControl('')
  });

  agregarRol() {
    if (this.rolForm.value.rolSeleccionado) {
      this.dataSource.push({ nombre: this.rolForm.value.rolSeleccionado });
      this.rolForm.reset();
    }
  }

  guardarRoles() {
    console.log('Roles guardados:', this.dataSource);
  }
}
