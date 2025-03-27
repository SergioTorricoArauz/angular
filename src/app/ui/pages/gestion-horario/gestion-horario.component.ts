import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-horario',
  imports: [CommonModule],
  templateUrl: './gestion-horario.component.html',
  styleUrl: './gestion-horario.component.css',
})
export class GestionHorarioComponent {
  months = [
    { label: 'ENE', worked: 640, extra: 0, planned: 640 },
    { label: 'FEB', worked: 600, extra: 40, planned: 640 },
    { label: 'MAR', worked: 480, extra: 0, planned: 640 },
    { label: 'ABR', worked: 0, extra: 0, planned: 640 },
    { label: 'MAY', worked: 0, extra: 0, planned: 640 },
    { label: 'JUN', worked: 0, extra: 0, planned: 640 },
  ];
}
