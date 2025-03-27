import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DaySchedule } from '../../../infrastructure/api/gestio-horario.service';

@Component({
  selector: 'app-mi-horario',
  imports: [CommonModule],
  templateUrl: './mi-horario.component.html',
  styleUrl: './mi-horario.component.css',
})
export class MiHorarioComponent {
  cellHeight = 40;

  hours: string[] = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, '0')}:00`
  );

  week: DaySchedule[] = [
    {
      day: 'Lunes',
      date: '10/03',
      events: [
        {
          title: 'Tigo ATC 611',
          time: 'De 01:00 a 08:00 am',
          start: 1,
          end: 8,
          color: '#59d2d2',
        },
      ],
    },
    {
      day: 'Martes',
      date: '11/03',
      events: [
        {
          title: 'Tigo ATC 611',
          time: '',
          start: 9,
          end: 13,
          color: '#59d2d2',
        },
      ],
    },
    {
      day: 'Miércoles',
      date: '12/03',
      events: [
        {
          title: 'Tigo ATC 611',
          time: '',
          start: 5,
          end: 10,
          color: '#59d2d2',
        },
      ],
    },
    {
      day: 'Jueves',
      date: '13/03',
      events: [
        {
          title: 'Servicio secundario',
          time: '',
          start: 6,
          end: 11,
          color: '#f2c94c',
        },
      ],
    },
    {
      day: 'Viernes',
      date: '14/03',
      events: [
        {
          title: 'Tigo ATC 611',
          time: '',
          start: 8,
          end: 12,
          color: '#59d2d2',
        },
      ],
    },
    {
      day: 'Sábado',
      date: '15/03',
      events: [
        {
          title: 'Tigo ATC 611',
          time: '',
          start: 6,
          end: 11,
          color: '#59d2d2',
        },
      ],
    },
    {
      day: 'Domingo',
      date: '16/03',
      events: [],
    },
  ];
}
