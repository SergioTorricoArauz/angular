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
  ],
  template: `
    <div class="contenedor">
      <h2>Nueva Programación</h2>
      <form class="form-container">
        <div class="column-left">
          <!-- Cliente -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Cliente</mat-label>
            <mat-select [(ngModel)]="form.clienteId" name="cliente">
              <mat-option *ngFor="let cliente of clientes" [value]="cliente.id">
                {{ cliente.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Campaña -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Campaña</mat-label>
            <mat-select [(ngModel)]="form.campaniaId" name="campania">
              <mat-option *ngFor="let campana of campanas" [value]="campana.id">
                {{ campana.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Servicio -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Servicio</mat-label>
            <mat-select [(ngModel)]="form.servicioId" name="servicio">
              <mat-option
                *ngFor="let servicio of servicios"
                [value]="servicio.id"
              >
                {{ servicio.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Cantidad de horas asociadas -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Cantidad de horas asociadas</mat-label>
            <input
              matInput
              type="number"
              [(ngModel)]="form.horas"
              name="horas"
            />
          </mat-form-field>

          <!-- Operadores hombres -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Operadores Hombres</mat-label>
            <input
              matInput
              type="number"
              [(ngModel)]="form.operadoresH"
              name="operadoresH"
            />
          </mat-form-field>

          <!-- Operadores mujeres -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Operadores Mujeres</mat-label>
            <input
              matInput
              type="number"
              [(ngModel)]="form.operadorasM"
              name="operadorasM"
            />
          </mat-form-field>
        </div>

        <div class="column-right">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label class="custom-label">Horas Programadas</mat-label>
            <input
              matInput
              [value]="form.horasProgramadas"
              readonly
              class="custom-readonly-input"
            />
          </mat-form-field>

          <div class="fecha-row">
            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Fecha de inicio</mat-label>
              <input matInput type="date" [(ngModel)]="form.fechaInicio" />
            </mat-form-field>

            <mat-form-field appearance="outline" class="half-width">
              <mat-label>Fecha de fin</mat-label>
              <input matInput type="date" [(ngModel)]="form.fechaFin" />
            </mat-form-field>
          </div>

          <div class="agregar-link-wrapper">
            <a
              href="javascript:void(0)"
              class="agregar-link"
              (click)="agregarCampos()"
              >+ Agregar</a
            >
          </div>

          <!-- Campos adicionales agregados dinámicamente -->
          <div
            *ngFor="let item of camposDisponibilidad; let i = index"
            class="horarios-container"
          >
            <h3>Disponibilidad de días</h3>
            <div class="dias">
              <mat-checkbox
                *ngFor="let dia of dias"
                [(ngModel)]="item.dias[dia]"
                [name]="'dias_' + dia"
              >
                {{ dia }}
              </mat-checkbox>
            </div>

            <h3>Horarios</h3>
            <div class="horario-fields">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Desde</mat-label>
                <input
                  matInput
                  [(ngModel)]="item.horarioDesde"
                  name="horarioDesde"
                />
              </mat-form-field>
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Hasta</mat-label>
                <input
                  matInput
                  [(ngModel)]="item.horarioHasta"
                  name="horarioHasta"
                />
              </mat-form-field>
            </div>
          </div>
        </div>
      </form>

      <div class="acciones">
        <button mat-stroked-button color="warn">Cerrar</button>
        <button mat-raised-button color="primary">Guardar</button>
        <button mat-raised-button color="accent" (click)="crearProgramacion()">
          Crear Programación
        </button>
      </div>
    </div>
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
      .agregar-btn {
        align-self: flex-start;
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
  ],
})
export class CrearProgramacionComponent implements OnInit {
  clientes: any[] = [];
  campanas: any[] = [];
  servicios: any[] = [];
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
    horasProgramadas: 1824, // Horas programadas
  };

  camposDisponibilidad: any[] = [
    { dias: {}, horarioDesde: '', horarioHasta: '' },
  ];

  constructor(
    private clienteService: ClienteService,
    private servicioService: ServicioService,
    private campaniaService: CampaignService,
    private scheduleService: ScheduleService // Inyectamos el servicio
  ) {}

  ngOnInit() {
    this.cargarClientes();
    this.cargarServicios();
    this.cargarCampanias();
  }

  cargarClientes() {
    this.clienteService.getClients().subscribe({
      next: (clientes) => {
        this.clientes = clientes.map((cliente) => ({
          id: cliente.id,
          name: cliente.name,
        }));
      },
      error: (err) => {
        console.error('Error al cargar los clientes', err);
      },
    });
  }

  cargarServicios() {
    this.servicioService.getServices().subscribe({
      next: (servicios) => {
        this.servicios = servicios.map((servicio) => ({
          id: servicio.id,
          name: servicio.name,
        }));
      },
      error: (err) => {
        console.error('Error al cargar los servicios', err);
      },
    });
  }

  cargarCampanias() {
    this.campaniaService.getCampaigns().subscribe({
      next: (campanas) => {
        this.campanas = campanas.map((campana) => ({
          id: campana.id,
          name: campana.name,
        }));
      },
      error: (err) => {
        console.error('Error al cargar las campañas', err);
      },
    });
  }

  agregarCampos() {
    this.camposDisponibilidad.push({
      dias: {},
      horarioDesde: '',
      horarioHasta: '',
    });
  }

  crearProgramacion() {
    const startDate = new Date(this.form.fechaInicio).toISOString(); // Convertimos la fecha de inicio a ISO 8601
    const endDate = new Date(this.form.fechaFin).toISOString(); // Convertimos la fecha de fin a ISO 8601

    const requestData: Schedule = {
      name: 'Programación de ejemplo', // Nombre que inventamos
      description: 'Descripción de la programación', // Descripción inventada
      status: 'Activo', // Estado inventado
      campaignId: this.form.campaniaId,
      clientId: this.form.clienteId,
      serviceId: this.form.servicioId,
      hoursAssigned: this.form.horas,
      operatorsCountMale: this.form.operadoresH,
      operatorsCountFemale: this.form.operadorasM,
      serviceTypeId: 1, // Tipo de servicio
      startAt: startDate, // Fecha de inicio
      endsAt: endDate, // Fecha de fin
    };

    this.scheduleService.createSchedule(requestData).subscribe({
      next: (response) => {
        console.log('Programación creada con éxito', response);
      },
      error: (err) => {
        console.error('Error al crear la programación', err);
      },
    });
  }
}
