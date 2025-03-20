import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-programacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="contenedor">
      <h2>Nueva Programación</h2>
      <form class="form-container">
        <div class="column">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Cliente</mat-label>
            <mat-select [(ngModel)]="form.cliente" name="cliente">
              <mat-option *ngFor="let cliente of clientes" [value]="cliente">{{ cliente }}</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Campaña</mat-label>
            <mat-select [(ngModel)]="form.campania" name="campania">
              <mat-option *ngFor="let campania of campaniasFiltradas" [value]="campania">{{ campania }}</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Servicio</mat-label>
            <mat-select [(ngModel)]="form.servicio" name="servicio">
              <mat-option *ngFor="let servicio of serviciosFiltrados" [value]="servicio">{{ servicio }}</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div class="column">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Cantidad de horas asociadas</mat-label>
            <input matInput type="number" [(ngModel)]="form.horas" name="horas">
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Operadores hombres</mat-label>
            <input matInput type="number" [(ngModel)]="form.operadoresH" name="operadoresH">
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Operadoras mujeres</mat-label>
            <input matInput type="number" [(ngModel)]="form.operadoresM" name="operadoresM">
          </mat-form-field>
        </div>
      </form>
      <div class="column">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Fecha inicio</mat-label>
          <input matInput [matDatepicker]="inicioPicker" [(ngModel)]="form.fechaInicio" name="fechaInicio">
          <mat-datepicker-toggle matIconSuffix [for]="inicioPicker"></mat-datepicker-toggle>
          <mat-datepicker #inicioPicker></mat-datepicker>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Fecha fin</mat-label>
          <input matInput [matDatepicker]="finPicker" [(ngModel)]="form.fechaFin" name="fechaFin">
          <mat-datepicker-toggle matIconSuffix [for]="finPicker"></mat-datepicker-toggle>
          <mat-datepicker #finPicker></mat-datepicker>
        </mat-form-field>
      </div>
      <div class="horarios-container">
        <h3>Disponibilidad de días</h3>
        <div class="dias">
          <mat-checkbox *ngFor="let dia of dias" [(ngModel)]="form.dias[dia]" [name]="'dias_' + dia">{{ dia }}</mat-checkbox>
        </div>
        <h3>Horarios</h3>
        <div class="horario-fields">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Desde</mat-label>
            <input matInput [(ngModel)]="form.horarioDesde" name="horarioDesde">
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Hasta</mat-label>
            <input matInput [(ngModel)]="form.horarioHasta" name="horarioHasta">
          </mat-form-field>
        </div>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Intervalo en minutos</mat-label>
          <input matInput type="number" [(ngModel)]="form.intervalo" name="intervalo">
        </mat-form-field>
        <button mat-raised-button color="primary" class="agregar-btn" (click)="agregarHorario()">+ Agregar</button>
      </div>
      <div class="acciones">
        <button mat-stroked-button class="btn">Cerrar</button>
        <button mat-raised-button color="primary" class="btn">Guardar</button>
        <button mat-raised-button color="accent" class="btn">Crear Programación</button>
      </div>
    </div>
  `,
  styles: [
    `.contenedor { padding: 20px; display: flex; flex-direction: column; gap: 20px; max-width: 800px; margin: auto; }
    .form-container { display: flex; justify-content: space-between; flex-wrap: wrap; }
    .column { display: flex; flex-direction: column; gap: 15px; flex: 1; }
    .full-width { width: 100%; }
    .horarios-container { display: flex; flex-direction: column; gap: 10px; }
    .dias { display: flex; gap: 10px; flex-wrap: wrap; }
    .horario-fields { display: flex; gap: 10px; flex-wrap: wrap; }
    .agregar-btn { align-self: flex-start; }
    .acciones { display: flex; gap: 10px; justify-content: center; margin-top: 20px; }
    .btn { min-width: 120px; }`
  ]
})
export class CrearProgramacionComponent implements OnInit {
  clientes = ['Cliente A', 'Cliente B'];
  campaniasFiltradas = ['Campaña 1', 'Campaña 2'];
  serviciosFiltrados = ['Servicio 1', 'Servicio 2'];
  dias = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

  form: {
    cliente: string;
    campania: string;
    servicio: string;
    horas: number | null;
    operadoresH: number | null;
    operadoresM: number | null;
    fechaInicio: Date | null;
    fechaFin: Date | null;
    dias: { [key: string]: boolean };
    intervalo: number | null;
    horarioDesde: string;
    horarioHasta: string;
  } = {
    cliente: '',
    campania: '',
    servicio: '',
    horas: null,
    operadoresH: null,
    operadoresM: null,
    fechaInicio: null,
    fechaFin: null,
    dias: {},
    intervalo: null,
    horarioDesde: '',
    horarioHasta: ''
  };

  ngOnInit() {}

  agregarHorario() {
    console.log('Agregar nuevo horario');
  }
}
