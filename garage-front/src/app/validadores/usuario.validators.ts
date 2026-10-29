import {ValidatorFn,ValidationErrors, AbstractControl } from '@angular/forms';



  //Validacion propia de contraseña
  export function contrasenaSegura():ValidatorFn {
    return(control: AbstractControl): ValidationErrors | null => {
      if(control.value.length < 8 || !/[A-Z]/.test(control.value) || !/[0-9]/.test(control.value) ){
        return {contrasenaSegura:true};
      }
      return null; 
    }
  };

    //Validacion de contraseñas iguales
  export function contrasenaCoinciden(controlContrasena:AbstractControl):ValidatorFn {
    return(controlRepetir: AbstractControl): ValidationErrors | null => {
      if(controlRepetir.value !== controlContrasena.value) {
        return {contrasenaCoinciden: true};
      }
      return null; 
    }
  };