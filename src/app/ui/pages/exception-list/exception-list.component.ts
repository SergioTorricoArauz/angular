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
import { EditExceptionComponent } from '../edit-exception/edit-exception.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
    if (
      confirm(`¿Estás seguro de eliminar la excepción "${exception.type}"?`)
    ) {
      this.exceptionService.deleteExceptionReason(exception.id).subscribe(
        () => {
          console.log(`✅ Excepción "${exception.type}" eliminada.`);
          this.loadExceptions(); // Recargar la lista

          // Mostrar la ventana de éxito con el nombre de la excepción eliminada
          this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
              title: 'Excepción Eliminada',
              message: `La excepción "${exception.type}" ha sido eliminada correctamente.`,
            },
          });
        },
        (error) => {
          console.error('❌ Error al eliminar excepción:', error);
        }
      );
    }
  }

  editException(exception: ExceptionTableItem) {
    console.log('✏️ Editar excepción:', exception);

    // Abrir modal de edición con los datos de la excepción seleccionada
    const dialogRef = this.dialog.open(EditExceptionComponent, {
      width: '450px',
      data: { id: exception.id },
    });

    dialogRef.afterClosed().subscribe((nombreExcepcion) => {
      if (nombreExcepcion) {
        // Si hay un nombre, significa que se editó correctamente
        this.loadExceptions(); // Recargar la lista después de editar

        // Mostrar la ventana de confirmación con el nombre de la excepción
        this.dialog.open(ConfirmDialogComponent, {
          width: '400px',
          data: {
            title: 'Excepción Actualizada',
            message: `La excepción "${nombreExcepcion}" ha sido actualizada con éxito.`,
          },
        });
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewExceptionDialogComponent);

    dialogRef.afterClosed().subscribe((nombreExcepcion) => {
      if (nombreExcepcion) {
        // Si hay un nombre, significa que se creó correctamente
        this.loadExceptions(); // Recargar la lista de excepciones

        // Mostrar el modal de confirmación con el nombre de la excepción creada
        this.dialog.open(ConfirmDialogComponent, {
          width: '400px',
          data: {
            title: 'Excepción Creada',
            message: `La excepción "${nombreExcepcion}" ha sido creada con éxito.`,
          },
        });
      }
    });
  }
}
