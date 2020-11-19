import { Component, OnInit } from '@angular/core';
import { EmployedService } from '../../../services/employed.service';
import { empleadoModel } from '../../../models/empleado.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  empleado: empleadoModel[] = [];
  cargando = false;
  rol: any[] = [];
  styleExpression = true;

  constructor(private empleadoService: EmployedService) {}

  ngOnInit(): void {
    this.cargando = true;
    this.empleadoService.getEmpleado().subscribe((resp) => {
      this.empleado = resp;
      this.cargando = false;
      console.log(this.empleado[0]);
    });

  }

  borrarHeroe(empleado: empleadoModel, i: number) {
    Swal.fire({
      title: 'Está seguro',
      text: `Está seguro que desea borrar a ${empleado.name}`,
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.empleado.splice(i, 1);
        this.empleadoService.borrarEmpleado(empleado.id).subscribe();
      }
    });
  }

  getColorRol(rol) {
    switch (rol) {
      case 'Digitador':
        return 'badge badge-danger';
      case 'Revisor':
        return 'badge badge-primary';
      case 'Asesor':
        return 'badge badge-success';
      case 'Programador':
        return 'badge badge-warning';
    }
  }
}
