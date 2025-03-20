import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-recuperar-password',
  imports: [
    MatCard,
    ReactiveFormsModule,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './recuperar-password.component.html',
  styleUrl: './recuperar-password.component.css'
})
export class RecuperarPasswordComponent {
  recoveryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.recoveryForm.valid) {
      console.log(this.recoveryForm.value);
    }
  }
}
