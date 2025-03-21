import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatIconModule, MatButtonModule], // 👈 Agrega los módulos aquí
  template: `
    <div class="dialog-container">
      <mat-icon class="success-icon">check_circle</mat-icon>
      <h2>{{ data.title }}</h2>
      <p>{{ data.message }}</p>
      <button mat-raised-button color="primary" (click)="close()">OK</button>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        text-align: center;
        padding: 20px;
      }
      .success-icon {
        font-size: 60px;
        color: #4caf50;
      }
      h2 {
        margin-top: 10px;
        font-weight: bold;
      }
      p {
        color: #555;
        font-size: 16px;
      }
      button {
        margin-top: 20px;
        width: 100px;
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  close() {
    this.dialogRef.close();
  }
}
