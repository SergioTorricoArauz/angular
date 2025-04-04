import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClienteService } from '../../../infrastructure/api/cliente.service';
import { ServicioService } from '../../../infrastructure/api/servicio.service';
import { CampaignService } from '../../../infrastructure/api/campaign.service';
import { Schedule, ScheduleService } from '../../../infrastructure/api/schedule.service';
import { ScheduleHourService } from '../../../infrastructure/api/schedulehour.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignacionComponent } from '../asignacion/asignacion.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-programacion',
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
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    AsignacionComponent,
  ],
  templateUrl: './edit-programacion.component.html',
  styleUrls: ['./edit-programacion.component.scss']
})
export class EditProgramacionComponent implements OnInit {
  clientes: any[] = [];
  campanas: any[] = [];
  servicios: any[] = [];
  usuarios: any[] = [];
  turnos: any[] = [];
  sheduleId: number = 0;
  showAsignacion: boolean = false;
  dias = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
  isProgramacionGuardada: boolean = false;

  form: any = {
    clienteId: null,
    campaniaId: null,
    servicioId: null,
    horas: null,
    operadoresH: null,
    operadorasM: null,
    fechaInicio: null,
    fechaFin: null,
    horasProgramadas: 1824,
  };

  camposDisponibilidad: any[] = [
    { dias: {}, horarios: [{ horarioDesde: '', horarioHasta: '' }] },
  ];

  constructor(
    private clienteService: ClienteService,
    private servicioService: ServicioService,
    private campaniaService: CampaignService,
    private scheduleService: ScheduleService,
    private scheduleServiceHour: ScheduleHourService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const scheduleId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.sheduleId = scheduleId;

    this.scheduleService.getSchedulesById(scheduleId).subscribe(response => {
      console.log(response);
    });
    this.scheduleServiceHour.getSheduleHourByShedule(scheduleId).subscribe(response => {
      console.log(response);
    });
    this.cargarClientes();
    this.cargarServicios();
    this.cargarCampanias();
  }

  cargarClientes() {
    this.clienteService.getClients().subscribe({
      next: (clientes) => {
        this.clientes = clientes.map((cliente) => ({ id: cliente.id, name: cliente.name }));
      },
      error: (err) => console.error('Error al cargar los clientes', err),
    });
  }

  cargarServicios() {
    this.servicioService.getServices().subscribe({
      next: (servicios) => {
        this.servicios = servicios.map((servicio) => ({ id: servicio.id, name: servicio.name }));
      },
      error: (err) => console.error('Error al cargar los servicios', err),
    });
  }

  cargarCampanias() {
    this.campaniaService.getCampaigns().subscribe({
      next: (campanas) => {
        this.campanas = campanas.map((campana) => ({ id: campana.id, name: campana.name }));
      },
      error: (err) => console.error('Error al cargar las campañas', err),
    });
  }

  agregarCampos() {
    this.camposDisponibilidad.push({ dias: {}, horarios: [{ horarioDesde: '', horarioHasta: '' }] });
  }

  agregarHorario(index: number) {
    this.camposDisponibilidad[index].horarios.push({ horarioDesde: '', horarioHasta: '' });
  }

  crearProgramacion() {
    const operadoresH = this.form.operadoresH || 0;
    const operadorasM = this.form.operadorasM || 0;
    const usuarios = [];

    for (let i = 0; i < operadoresH; i++) {
      usuarios.push({
        nombre: `Ingresar Usuario`,
        sexo: 'Masculino',
        desde: this.form.fechaInicio,
        hasta: this.form.fechaFin
      });
    }
    for (let i = 0; i < operadorasM; i++) {
      usuarios.push({
        nombre: `Ingresar Usuario`,
        sexo: 'Femenino',
        desde: this.form.fechaInicio,
        hasta: this.form.fechaFin
      });
    }

    this.usuarios = usuarios;
    this.showAsignacion = true;

    const turnos = [];
    for (let i = 0; i < this.camposDisponibilidad.length; i++) {
      for (let j = 0; j < this.camposDisponibilidad[i].horarios.length; j++) {
        const horario = this.camposDisponibilidad[i].horarios[j];
        turnos.push({ code: `E${i + 1}_${j + 1}`, horaDesde: horario.horarioDesde, HoraFin: horario.horarioHasta });
        turnos.push({ code: `S${i + 1}_${j + 1}`, horaDesde: horario.horarioDesde, HoraFin: horario.horarioHasta });
      }
    }
    this.turnos = turnos;
  }

  guardar() {
    const startDate = new Date(this.form.fechaInicio);
    const endDate = new Date(this.form.fechaFin);

    const requestData: Schedule = {
      name: 'Programación de ejemplo',
      description: 'Descripción de la programación',
      status: 'Activo',
      campaignId: this.form.campaniaId,
      clientId: this.form.clienteId,
      serviceId: this.form.servicioId,
      hoursAssigned: this.form.horas,
      operatorsCountMale: this.form.operadoresH,
      operatorsCountFemale: this.form.operadorasM,
      serviceTypeId: 1,
      startAt: startDate,
      endsAt: endDate,
    };

    this.scheduleService.createSchedule(requestData).subscribe({
      next: (response) => {
        if (!response.id) return;

        const diasMap: any = {
          Lun: 'Lunes',
          Mar: 'Martes',
          Mie: 'Miércoles',
          Jue: 'Jueves',
          Vie: 'Viernes',
          Sab: 'Sábado',
          Dom: 'Domingo',
        };
        this.sheduleId = response.id;

        const scheduleCreateHours: any[] = [];

        this.camposDisponibilidad.forEach(campo => {
          const diasSeleccionados = Object.keys(campo.dias)
            .filter(dia => campo.dias[dia])
            .map(dia => diasMap[dia]);

          const hours = campo.horarios.map((h: { horarioDesde: string; horarioHasta: string }) => ({
            startsTimeAt: h.horarioDesde,
            endsTimeAt: h.horarioHasta
          }));

          diasSeleccionados.forEach(dia => {
            scheduleCreateHours.push({
              scheduleId: response.id,
              daysOfWeek: dia,
              hours: hours
            });
          });
        });

        this.scheduleServiceHour.createSheduleHour(scheduleCreateHours).subscribe((res: any) => {
          console.log('Horario creado', res);
        });

        this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: 'Éxito',
            message: 'La programación se ha guardado correctamente.'
          }
        });

        this.isProgramacionGuardada = true;
      },
      error: (err) => console.error('Error al crear la programación', err),
    });
  }
}
