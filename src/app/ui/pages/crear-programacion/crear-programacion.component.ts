import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ClienteService} from '../../../infrastructure/api/cliente.service';
import {ServicioService} from '../../../infrastructure/api/servicio.service';
import {CampaignService} from '../../../infrastructure/api/campaign.service';
import {Schedule, ScheduleService} from '../../../infrastructure/api/schedule.service';
import {ScheduleHourCreate, ScheduleHourService} from '../../../infrastructure/api/schedulehour.service';
import {Route, Router} from '@angular/router';
import {AsignacionComponent} from '../asignacion/asignacion.component';

@Component({
  selector: 'app-crear-programacion',
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
  template: `
    <div class="contenedor" *ngIf="!showAsignacion">
      <h2>Nueva Programación</h2>
      <form class="form-container">
        <div class="column-left">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Cliente</mat-label>
            <mat-select [(ngModel)]="form.clienteId" name="cliente">
              <mat-option *ngFor="let cliente of clientes" [value]="cliente.id">
                {{ cliente.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Campaña</mat-label>
            <mat-select [(ngModel)]="form.campaniaId" name="campania">
              <mat-option *ngFor="let campana of campanas" [value]="campana.id">
                {{ campana.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Servicio</mat-label>
            <mat-select [(ngModel)]="form.servicioId" name="servicio">
              <mat-option *ngFor="let servicio of servicios" [value]="servicio.id">
                {{ servicio.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Cantidad de horas asociadas</mat-label>
            <input matInput type="number" [(ngModel)]="form.horas" name="horas"/>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Operadores Hombres</mat-label>
            <input matInput type="number" [(ngModel)]="form.operadoresH" name="operadoresH"/>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Operadores Mujeres</mat-label>
            <input matInput type="number" [(ngModel)]="form.operadorasM" name="operadorasM"/>
          </mat-form-field>
        </div>

        <div class="column-right">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label class="custom-label">Horas Programadas</mat-label>
            <input matInput [value]="form.horasProgramadas" readonly class="custom-readonly-input"/>
          </mat-form-field>

          <div class="fecha-row">
            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Fecha de inicio</mat-label>
              <input matInput type="date" [(ngModel)]="form.fechaInicio" name="fechaInicio"/>
            </mat-form-field>

            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Fecha de fin</mat-label>
              <input matInput type="date" [(ngModel)]="form.fechaFin" name="fechaFin"/>
            </mat-form-field>
          </div>

          <div class="agregar-link-wrapper">
            <a href="javascript:void(0)" class="agregar-link" (click)="agregarCampos()">
              + Agregar Disponibilidad
            </a>
          </div>

          <div *ngFor="let item of camposDisponibilidad; let i = index" class="horarios-container">
            <h3>Disponibilidad de días</h3>
            <div class="dias">
              <mat-checkbox *ngFor="let dia of dias" [(ngModel)]="item.dias[dia]" [name]="'dias_' + dia + '_' + i">
                {{ dia }}
              </mat-checkbox>
            </div>

            <h3>Horarios</h3>
            <div *ngFor="let horario of item.horarios; let j = index" class="horario-fields">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Desde</mat-label>
                <input matInput [(ngModel)]="horario.horarioDesde" [name]="'horarioDesde_' + i + '_' + j"/>
              </mat-form-field>
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Hasta</mat-label>
                <input matInput [(ngModel)]="horario.horarioHasta" [name]="'horarioHasta_' + i + '_' + j"/>
              </mat-form-field>
            </div>

            <button mat-stroked-button color="accent" (click)="agregarHorario(i)">
              + Agregar horario
            </button>
          </div>
        </div>
      </form>

      <div class="acciones">
        <button mat-stroked-button color="warn">Cerrar</button>
        <button mat-raised-button color="primary" (click)="guardar()">Guardar</button>
        <button mat-raised-button color="accent" (click)="crearProgramacion()">
          Crear Programación
        </button>
      </div>
    </div>

    <app-asignacion *ngIf="showAsignacion" [usuarios]="usuarios" [turnos]="turnos" [scheduleId]="sheduleId"></app-asignacion>
  `,
  styles: [
    `
      .contenedor {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-width: 1200px;
        margin: auto;
        max-height: 90vh; /* o lo que se ajuste mejor */
        overflow-y: auto;
      }

      .form-container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 40px;
      }

      .column-left,
      .column-right {
        display: flex;
        flex-direction: column;
        gap: 15px;
        flex: 1;
      }

      .full-width {
        width: 100%;
      }

      .horarios-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .dias {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }

      .acciones {
        display: flex;
        gap: 15px;
        justify-content: center;
        margin-top: 20px;
      }

      .mat-form-field {
        margin-bottom: 15px;
      }

      .mat-checkbox {
        margin-right: 10px;
      }

      .agregar-link {
        color: #1976d2;
        font-weight: bold;
        text-decoration: none;
        margin-top: 15px;
        cursor: pointer;
      }

      .agregar-link:hover {
        text-decoration: underline;
      }

      .horario-fields {
        display: flex;
        gap: 20px;
      }

      .half-width {
        width: 48%;
      }

      .fecha-row {
        display: flex;
        gap: 40px;
        margin: 20px 0;
      }

      .agregar-link-wrapper {
        margin-left: auto;
      }
    `,
  ]
})
export class CrearProgramacionComponent implements OnInit {
  clientes: any[] = [];
  campanas: any[] = [];
  servicios: any[] = [];
  usuarios: any[] = [];
  turnos: any[] = [];
  sheduleId: number = 0;
  showAsignacion: boolean = false;
  dias = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

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
    {dias: {}, horarios: [{horarioDesde: '', horarioHasta: ''}]},
  ];

  constructor(
    private clienteService: ClienteService,
    private servicioService: ServicioService,
    private campaniaService: CampaignService,
    private scheduleService: ScheduleService,
    private scheduleServiceHour: ScheduleHourService,
    private route: Router
  ) {
  }

  ngOnInit() {
    this.cargarClientes();
    this.cargarServicios();
    this.cargarCampanias();
  }

  cargarClientes() {
    this.clienteService.getClients().subscribe({
      next: (clientes) => {
        this.clientes = clientes.map((cliente) => ({id: cliente.id, name: cliente.name}));
      },
      error: (err) => console.error('Error al cargar los clientes', err),
    });
  }

  cargarServicios() {
    this.servicioService.getServices().subscribe({
      next: (servicios) => {
        this.servicios = servicios.map((servicio) => ({id: servicio.id, name: servicio.name}));
      },
      error: (err) => console.error('Error al cargar los servicios', err),
    });
  }

  cargarCampanias() {
    this.campaniaService.getCampaigns().subscribe({
      next: (campanas) => {
        this.campanas = campanas.map((campana) => ({id: campana.id, name: campana.name}));
      },
      error: (err) => console.error('Error al cargar las campañas', err),
    });
  }

  agregarCampos() {
    this.camposDisponibilidad.push({dias: {}, horarios: [{horarioDesde: '', horarioHasta: ''}]});
  }

  agregarHorario(index: number) {
    this.camposDisponibilidad[index].horarios.push({horarioDesde: '', horarioHasta: ''});
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
        turnos.push({code: `E${i + 1}_${j + 1}`, horaDesde: horario.horarioDesde, HoraFin: horario.horarioHasta});
        turnos.push({code: `S${i + 1}_${j + 1}`, horaDesde: horario.horarioDesde, HoraFin: horario.horarioHasta});
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
            .map(dia => diasMap[dia]); // ['Lunes', 'Martes']

          const hours = campo.horarios.map((h: { horarioDesde: string; horarioHasta: string }) => ({
            startsTimeAt: h.horarioDesde,
            endsTimeAt: h.horarioHasta
          }));

          diasSeleccionados.forEach(dia => {
            scheduleCreateHours.push({
              scheduleId: response.id,
              daysOfWeek: dia, // Un día por objeto
              hours: hours
            });
          });
        });
        console.log(scheduleCreateHours, "SCHEDULELLCREATEHOURS");

// Enviar el array completo (un objeto por día)
        this.scheduleServiceHour.createSheduleHour(scheduleCreateHours).subscribe((res: any) => {
          console.log('Horario creado', res);
        });

      },
      error: (err) => console.error('Error al crear la programación', err),
    });
  }
}
