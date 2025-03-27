import { Injectable } from '@angular/core';

export interface Event {
  title: string;
  time: string;
  start: number;
  end: number;
  color: string;
}

export interface DaySchedule {
  day: string;
  date: string;
  events: Event[];
}


@Injectable({
  providedIn: 'root',
})
export class GestioHorarioService {
  constructor() {}
}
