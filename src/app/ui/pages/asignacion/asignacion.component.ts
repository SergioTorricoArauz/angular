import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { addDays, format, isWeekend } from 'date-fns';

@Component({
  standalone: true,
  selector: 'app-asignacion',
  imports: [CommonModule, MatTableModule],
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent {
  fechaInicio = new Date('2019-11-11');
  fechaFin = new Date('2019-11-30');

  turnos = ['E1', 'S1', 'E2', 'S2'];
  diasLaborales: { fecha: Date; dia: string; id: string }[] = [];

  displayedColumns: string[] = ['usuario', 'sexo', 'desde', 'hasta'];
  subColumns: string[] = [];

  dataSource = [
    {
      usuario: '123-Juan Perez',
      sexo: 'Masculino',
      desde: '01/12/2024',
      hasta: '07/12/2024'
    },
    {
      usuario: 'Añadir usuario',
      sexo: 'Femenino',
      desde: '',
      hasta: ''
    }
  ];
  headerRow1: string[] = ['usuario', 'sexo', 'desde', 'hasta'];

  constructor() {
    this.diasLaborales = this.generarDiasLaborales();

    this.diasLaborales.forEach(dia => {
      this.turnos.forEach(turno => {
        const colId = `${dia.id}_${turno}`;
        this.displayedColumns.push(colId);
      });
    });

  }

  generarDiasLaborales(): { fecha: Date; dia: string; id: string }[] {
    const dias: { fecha: Date; dia: string; id: string }[] = [];
    let actual = new Date(this.fechaInicio);

    while (actual <= this.fechaFin) {
      if (!isWeekend(actual)) {
        const nombreDia = format(actual, 'EEEE'); // "Monday"
        const id = format(actual, 'yyyyMMdd'); // 20241111
        dias.push({
          fecha: new Date(actual),
          dia: `${this.capitalizar(nombreDia)} (${format(actual, 'dd/MM')})`,
          id: id
        });
      }
      actual = addDays(actual, 1);
    }

    return dias;
  }


  capitalizar(texto: string): string {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}
