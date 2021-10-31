import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string] : boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }
/**
 * 
 * @param control FormControl
 * @returns Objeto  
 * Validacion syncrona, se ajecuta al momento que el usuario modifica el campo
 */
  noHerrera( control : FormControl ) : ErrorValidate {
  
      if( control.value?.toLowerCase() === 'herrera' ){
        return { 
          noHerrera : true 
        }
      }

      return null;

  }

/**
 * 
 * @param pass1 
 * @param pass2 
 * @returns 
 * Validacion syncrona, se ajecuta al momento que el usuario modifica el campo
 * 
 */
  passNoIguales( pass1 : string, pass2 : string ){
    
    return ( formGroup : FormGroup ) => {
      
      const pass1Control = formGroup.controls[ pass1 ] ;
      const pass2Control = formGroup.controls[ pass2 ] ;

      if( pass1Control.value === pass2Control.value ){
        pass2Control.setErrors( null );
      }else{
        pass2Control.setErrors({ noEsIgual : true });
      }

    }
  }

  existeUsuario( usuario : FormControl ) : Promise<ErrorValidate> | Observable<ErrorValidate> {
    
    return new Promise( ( resolve, reject ) => { 
        setTimeout( () => { 

          if( usuario?.value === 'striker'  ){
              resolve ({ usuarioExiste : true })
          }else{
            resolve (null);
          }

         }, 3600 )
    } );

  }  
}
