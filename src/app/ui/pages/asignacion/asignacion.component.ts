import { Component, Input, OnInit } from '@angular/core';
import { addDays, format, isWeekend } from 'date-fns';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asignacion',
  standalone: true,
  imports: [CommonModule, MatTableModule, FormsModule],
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css'],
})
export class AsignacionComponent implements OnInit {
  @Input() usuarios: any[] = [];

  fechaInicio = new Date('2024-12-01');
  fechaFin = new Date('2024-12-20');

  @Input() turnos: any[] = [];

  diasLaborales: { dia: string; fecha: string; id: string }[] = [];

  ngOnInit() {
    this.diasLaborales = this.generarDiasLaborales();

    // Si los usuarios llegan vacíos o sin turnos inicializados
    for (let user of this.usuarios) {
      if (!user.turnos) {
        user.turnos = this.inicializarTurnos();
      }
    }
  }

  getPlaceholder(turno: any): string {
    console.log(turno);
    if (turno.code === 'E1') return turno.horaDesde;
    if (turno.code === 'S1') return turno.HoraFin;
    return '--:--';
  }

  generarDiasLaborales() {
    const dias: { dia: string; fecha: string; id: string }[] = [];
    let actual = new Date(this.fechaInicio);

    while (actual <= this.fechaFin) {
      const diaSemana = actual.getDay();
      if (diaSemana !== 0 && diaSemana !== 6) {
        const id = format(actual, 'yyyy-MM-dd');
        dias.push({
          dia: format(actual, 'EEEE'),
          fecha: format(actual, 'dd/MM'),
          id: id,
        });
      }
      actual = addDays(actual, 1);
    }

    return dias;
  }

  inicializarTurnos() {
    const turnosPorDia: any = {};
    for (let dia of this.diasLaborales) {
      turnosPorDia[dia.id] = {
        E1: '',
        S1: '',
        E2: '',
        S2: ''
      };
    }
    return turnosPorDia;
  }
}
