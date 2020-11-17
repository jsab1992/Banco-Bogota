import { empleadoModel } from './../models/empleado.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployedService {
  private baseURL = 'https://banco-de-bogota-2020.firebaseio.com/';
  constructor(private http: HttpClient) {}

  createEmpleado(empleado: empleadoModel) {
    return this.http.post(`${this.baseURL}/empleados.json`, empleado).pipe(
      map((resp: any) => {
        empleado.id = resp.name;
        return empleado;
      })
    );
  }

  putEmpleado(empleado: empleadoModel) {
    const empleadoTemp = {
      ...empleado,
    };

    delete empleadoTemp.id;

    return this.http.put(`${this.baseURL}/empleados/${empleado.id}.json`, empleadoTemp);
  }

  borrarEmpleado(id: string) {
    return this.http.delete(`${this.baseURL}/empleados/${id}.json`);
  }

  getEmpleados(id: string) {
    return this.http.get(`${this.baseURL}/empleados/${id}.json`);
  }

  getEmpleado() {
    return this.http
      .get(`${this.baseURL}/empleados.json`)
      .pipe(map(this.crearArreglo, delay(1500)));
  }

  private crearArreglo(empleadoObj: object) {
    const empleados: empleadoModel[] = [];

    Object.keys(empleadoObj).forEach((key) => {
      const empleado: empleadoModel = empleadoObj[key];
      empleado.id = key;
      empleados.push(empleado);
    });

    return empleados;
  }


}
