import { Component, inject } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private accesoService =inject(AccesoService);
  private router=inject(Router);

  public formBuild=inject(FormBuilder);

  public formLogin:FormGroup=this.formBuild.group({
    usuario:['',Validators.required],
    contrasena:['',Validators.required]
  })

  iniciarSesion(){
    if (this.formLogin.invalid)return;

    const objecto:Login={
      usuario:this.formLogin.value.usuario,
      contrasena:this.formLogin.value.contrasena
    }

    this.accesoService.login(objecto).subscribe({
      next:(data)=>{
        if(data.user){
          localStorage.setItem("token",data.jwt)
          this.router.navigate(['inicio'])
     }else{
          alert("Credenciales son incorrectas")
     }
      },
      error:(error) =>{
           console.log(error.message);
      }
    })
  }

  registrarse(){
    this.router.navigate(['registro'])
  }

}
