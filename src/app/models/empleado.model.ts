export class empleadoModel {
  id: string;
  name: string;
  funciones: string;
  jefe: string;
  // rol: string;
  rol: string[] = ['Digitador', 'Revisor', 'Asesor', 'Programador'];

}
