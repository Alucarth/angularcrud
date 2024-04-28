import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { CrudService } from '../../../servicio/crud.service';
import { Router } from '@angular/router';

import { title } from 'process';


@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrl: './agregar-empleado.component.css'
})
export class AgregarEmpleadoComponent implements OnInit{

  formularioDeEmpleados: FormGroup;

  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private ruteador:Router,
    private formBuilder:FormBuilder,

  ){


    this.formularioDeEmpleados=this.formulario.group({
      id_cargo:[''],
      ci:[''],
      nombre:[''],
      paterno:[''],
      materno:[''],
      direccion:[''],
      telefono:[''],
      Fecha_Nacimiento:[''],
      genero:[''],
      intereses:[''],
      // intereses_lista: new FormArray([]),
      //intereses: ['']
     /* intereses: this.formBuilder.group({
        estudiar: false,
        deporte: false,
        trabajar: false,
      })*/
    });

  }

  onCheckChange(event: any) {
    const formArray: FormArray = this.formularioDeEmpleados.get('intereses') as FormArray;
    console.log(event.target.value)
    console.log(event.target.checked)
    const index = this.checks.map( check => { return check.value}).indexOf(event.target.value)
    console.log('position index',index)
    this.checks[index].selected = event.target.checked;
    console.log(this.checks)
    //aqui armamos la lista como un array de values
    let interes = ''
    for(let check of this.checks)
    {
      if(check.selected)
      {
        interes = interes + ' ' + check.value
      }
    }
    this.formularioDeEmpleados.controls["intereses"].setValue(interes)

  }

  public checks: Array<ChoiceClass> = [
    {description: 'Estudiar', value: 'estudiar', selected: false},
    {description: "Deporte", value: 'deporte', selected: false },
    {description: "trabajar", value: 'trabajar', selected:false }
  ];

  ngOnInit(): void {

  }

  enviarDatos(): any{
    console.log("Me presionaste");
    // this.formularioDeEmpleados.
    console.log(this.formularioDeEmpleados.value);
    this.crudService.AgregarEmpleado(this.formularioDeEmpleados.value).subscribe( (respuesta)=>{
      console.log('respuesta', respuesta)
    });
    this.ruteador.navigateByUrl('/listar-empleado')
  }



}
export interface ChoiceClass{
  value: string,
  description: string,
  selected: boolean
}
