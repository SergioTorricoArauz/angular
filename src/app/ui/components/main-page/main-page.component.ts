import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NavigationComponent, HeaderComponent, RouterOutlet],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  showDialog = true; // Control de visibilidad del mensaje
}
