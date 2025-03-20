import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { NewExceptionDialogComponent } from '../new-exception-dialog/new-exception-dialog.component';
import { ExceptionService } from '../../../infrastructure/api/exception.service';
import { MatMenuModule } from '@angular/material/menu';

interface ExceptionTableItem {
  id: number;
  date: string;
  type: string;
  status: string;
}

@Component({
  selector: 'app-exception-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    NgClass,
    NgFor,
    NgIf,
  ],
  templateUrl: './exception-list.component.html',
  styleUrls: ['./exception-list.component.css'],
})
export class ExceptionListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'date', 'type', 'status', 'actions'];
  dataSource = new MatTableDataSource<ExceptionTableItem>([]);

  constructor(
    private dialog: MatDialog,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.loadExceptions();
  }

  loadExceptions() {
    this.exceptionService.getExceptionReasons().subscribe(
      (data) => {
        const formattedData: ExceptionTableItem[] = data.map((exception) => ({
          id: exception.id,
          date: new Date(exception.createdAt).toLocaleDateString(),
          type: exception.title,
          status: exception.status === 1 ? 'Active' : 'Inactive',
        }));

        this.dataSource.data = formattedData; // Se asignan los datos obtenidos del servicio
      },
      (error) => {
        console.error('Error al obtener excepciones:', error);
      }
    );
  }

  deleteException(exception: ExceptionTableItem) {
    if (confirm(`¿Seguro que deseas eliminar "${exception.type}"?`)) {
      this.exceptionService.deleteExceptionReason(exception.id).subscribe(
        () => {
          console.log(`Excepción "${exception.type}" eliminada correctamente.`);
          this.loadExceptions(); // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar excepción:', error);
        }
      );
    }
  }

  editException(exception: any) {
    console.log('Editar excepción:', exception);
    // Aquí puedes abrir un diálogo o hacer lo necesario para editar
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewExceptionDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadExceptions(); // Recargar datos cuando se cierre el modal
      }
    });
  }
}
