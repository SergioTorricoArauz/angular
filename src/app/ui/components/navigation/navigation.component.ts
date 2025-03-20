import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatIcon, MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink,
    MatIcon,
    MatIconModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  constructor(private _router: Router) {
  }

  submit() {
    console.log("gellos")
    this._router.navigate(['/user-list']);
  }

  activeRoute: string = '';

  setActive(route: string) {
    this.activeRoute = route;
  }
}
