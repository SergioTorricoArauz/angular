import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AsignacionComponent} from './ui/pages/asignacion/asignacion.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatFormFieldModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'untitled1';

  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return false;
  }
}
