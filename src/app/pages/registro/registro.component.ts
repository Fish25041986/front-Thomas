import { Component, inject } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { AccesoService } from '../../services/acceso.service';
import { Router } from 'express';
import { Usuario } from '../../interfaces/Usuario';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  private accesoService =inject(AccesoService);
  private router=inject(Router);

  public formBuild=inject(FormBuilder);

  public formRegistro:FormGroup=this.formBuild.group({
    nombre:['',Validators.required],
    apellido:['',Validators.required],
    direccion: ['', Validators.nullValidator],
    telefono: ['', Validators.nullValidator],
    email:['',Validators.required],
  })

  registrarse(){
    if(this.formRegistro.invalid) return;

    const objeto:Usuario = {
         nombre: this.formRegistro.value.nombre,
         apellido: this.formRegistro.value.correo,
         direccion: this.formRegistro.value.clave,
         telefono: this.formRegistro.value.clave,
         email: this.formRegistro.value.clave
    }

    this.accesoService.registrarse(objeto).subscribe({
         next: (data) =>{
              if(data.usuario){
                   this.router.navigate([''])
              }else{
                   alert("No se pudo registrar")
              }
         }, error:(error) =>{
              console.log(error.message);
         }
    })

}

volver(){
    this.router.navigate(['login'])
}

}
