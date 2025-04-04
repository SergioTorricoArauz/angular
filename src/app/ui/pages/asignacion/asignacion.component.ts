import {Component, Input, OnInit} from '@angular/core';
import {addDays, format, isWeekend} from 'date-fns';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {ScheduleHourService} from '../../../infrastructure/api/schedulehour.service';
import {ScheduleService} from '../../../infrastructure/api/schedule.service';
import {getTreeNoValidDataSourceError} from '@angular/cdk/tree';

@Component({
  selector: 'app-asignacion',
  standalone: true,
  imports: [CommonModule, MatTableModule, FormsModule],
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css'],
})
export class AsignacionComponent implements OnInit {
  @Input() usuarios: any[] = [];
  @Input() scheduleId: number = 0;

  fechaInicio = new Date('2024-12-01');
  fechaFin = new Date('2024-12-20');

  @Input() turnos: any[] = [];
  usuariosDisponibles: any[] = [];

  diasLaborales: { dia: string; fecha: string; id: string }[] = [];

  constructor(private scheduleServiceHour: ScheduleHourService,
              private scheduleService: ScheduleService
  ) {
  }

  ngOnInit() {
    this.scheduleServiceHour.getSheduleHourBySheduleUser(3).subscribe(response => {
      this.usuariosDisponibles = response;
    });
    this.diasLaborales = this.generarDiasLaborales();
    console.log("DÍAS LABORALES:", this.diasLaborales.map(d => d.dia));

    this.scheduleService.getSchedulesById(this.scheduleId).subscribe((data) => {
      this.fechaInicio = data.startAt;
      this.fechaFin = data.endsAt;

      this.scheduleServiceHour.getSheduleHourByShedule(this.scheduleId).subscribe((dataHour) => {
        this.turnos = [];
        console.log("DATAHOUR:", dataHour);

        const agrupadosPorDia: { [key: string]: any[] } = {};

        dataHour.forEach((item: any) => {
          const dias = item.daysOfWeek
            ?.split(',')
            .map((d: string) => d.trim().toLowerCase());

          const horas = item.hours;

          if (!dias || !Array.isArray(dias)) {
            console.warn('Item sin días válidos:', item);
            return;
          }

          dias.forEach((dia: string) => {
            if (!agrupadosPorDia[dia]) {
              agrupadosPorDia[dia] = [];
            }

            horas.forEach((hora: any, index: number) => {
              const entradaCode = `E${index + 1}`;
              const salidaCode = `S${index + 1}`;

              agrupadosPorDia[dia].push({
                code: entradaCode,
                horaDesde: hora.startsTimeAt,
                HoraFin: hora.endsTimeAt
              });

              agrupadosPorDia[dia].push({
                code: salidaCode,
                horaDesde: hora.startsTimeAt,
                HoraFin: hora.endsTimeAt
              });
            });
          });
        });

// Convertimos a array final
        this.turnos = Object.keys(agrupadosPorDia).map(dia => ({
          dia,
          turnos: agrupadosPorDia[dia]
        }));

        console.log("TURNOS AGRUPADOS:", this.turnos);

        console.log('TURNOS CON DÍAS:', this.turnos);

        // ✅ Inicializa turnos después de cargar correctamente `this.turnos`
        for (let user of this.usuarios) {
          if (!user.turnos) {
            user.turnos = this.inicializarTurnos();
          }
        }

        console.log("Turnos por día:", this.usuarios.map(u => u.turnos));
      });
    });

    // ❌ Eliminado el segundo bloque innecesario que causaba que turnos se vacíen antes de tiempo
  }



  agregarUsuario(usuario: any) {
    const nuevoUsuario = {
      ...usuario,
      nombre: `${usuario.firstname} ${usuario.lastname}`,
      sexo: usuario.gender,
      desde: this.fechaInicio,
      hasta: this.fechaFin,
      turnos: this.inicializarTurnos()
    };

    this.usuarios.push(nuevoUsuario);
  }
  agregarUsuarioDesdeSelect(event: any) {
    const userId = +event.target.value;
    const usuario = this.usuariosDisponibles.find(u => u.id === userId);
    if (usuario) {
      this.agregarUsuario(usuario);
    }
  }

  asignarUsuario(idSeleccionado: string, user: any) {
    const usuario = this.usuariosDisponibles.find(u => u.id === Number(idSeleccionado));
    if (usuario) {
      user.nombre = `${usuario.firstname} ${usuario.lastname}`;
      user.sexo = usuario.gender;
      user.mostrandoSelect = false;
    }
  }

  getPlaceholder(turno: any): string {
    return turno.horaDesde || '--:--';
  }

  turnosPorDia(diaNombre: string): any[] {
    return this.turnos.filter(t =>
      t.diasPermitidos?.includes(diaNombre.toLowerCase())
    );
  }
  diasMapReverso: any = {
    monday: 'lunes',
    tuesday: 'martes',
    wednesday: 'miercoles',
    thursday: 'jueves',
    friday: 'viernes'
  };
  getTurnosDelDia(nombreDia: string) {
    const diaObj = this.turnos.find(t => t.dia === nombreDia.toLowerCase());
    return diaObj?.turnos || null;
  }
  generarDiasLaborales() {
    const diasSemana = [
      { dia: 'lunes', fecha: '01/01' },
      { dia: 'martes', fecha: '02/01' },
      { dia: 'miercoles', fecha: '03/01' },
      { dia: 'jueves', fecha: '04/01' },
      { dia: 'viernes', fecha: '05/01' },
      { dia: 'sabado', fecha: '06/01' },
      { dia: 'domingo', fecha: '07/01' }
    ];

    return diasSemana.map((d, i) => ({
      dia: d.dia,
      fecha: d.fecha,
      id: `2024-01-0${i + 1}` // formato de ID único para ngModel
    }));
  }

  inicializarTurnos() {
    const turnosPorDia: any = {};

    for (let dia of this.diasLaborales) {
      const turnoDia: any = {};

      // Solo agrega los turnos permitidos explícitamente para ese día
      for (let turno of this.turnos) {
        const permitidos = turno.diasPermitidos?.map((d: string) => d.toLowerCase());
        if (permitidos?.includes(dia.dia.toLowerCase())) {
          turnoDia[turno.code] = '';
        }
      }

      turnosPorDia[dia.id] = turnoDia;
    }
    console.log(turnosPorDia, "turnos por dia");
    return turnosPorDia;
  }

  get turnosAgrupadosPorDia() {
    const diasUnicos = [...new Set(this.turnos.flatMap(t => t.diasPermitidos))];
    return diasUnicos.map(dia => ({
      dia,
      turnos: this.turnos.filter(t => t.diasPermitidos.includes(dia))
    }));
  }

  getDiaId(diaNombre: string): string {
    const encontrado = this.diasLaborales.find(d => d.dia === diaNombre);
    return encontrado?.id ?? '';
  }

  getFechaPorNombre(diaNombre: string): string {
    const encontrado = this.diasLaborales.find(d => d.dia === diaNombre);
    return encontrado?.fecha ?? '';
  }



  getColspan(dia: string): number {
    return this.turnos.filter(t => Array.isArray(t?.diasPermitidos) && t.diasPermitidos.includes(dia.toLowerCase())).length;
  }

  getTurnosVisiblesPorDia(dia: string): any[] {
    return this.turnosPorDia(dia); // ya está filtrado por día, así que no necesitas volver a filtrar
  }

  getTurnosPorDiaFiltrados(dia: string): any[] {
    return this.turnos.filter(turno =>
      turno.diasPermitidos?.some((d: string) => d.toLowerCase() === dia.toLowerCase())
    );
  }

}
