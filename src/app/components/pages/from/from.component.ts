import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { empleadoModel } from '../../../models/empleado.model';
import { EmployedService } from '../../../services/employed.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.scss'],
})
export class FromComponent implements OnInit {
  empleado: empleadoModel = new empleadoModel();


  constructor(
    private empleadoService: EmployedService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');


    if (id !== 'nuevo') {
      this.empleadoService.getEmpleados(id).subscribe((resp: empleadoModel) => {
        this.empleado = resp;
        this.empleado.id = id;
      });
    }
  }

  guardar(form: NgForm) {

    Object.values(form.controls).forEach((control) => {
      control.markAsTouched();
    });

    Swal.fire({
      title: 'Espere',
      text: 'Guardamndo informacion!',
      allowOutsideClick: false,
      footer: '<a href>Guardando información</a>',
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.empleado.id) {
      peticion = this.empleadoService.putEmpleado(this.empleado);
    } else {
      peticion = this.empleadoService.createEmpleado(this.empleado);
    }

    peticion.subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: this.empleado.name,
        text: 'Se actualizó correctamente!',
        footer: '<a href>Guardando información</a>',
      });
    });
  }
}
