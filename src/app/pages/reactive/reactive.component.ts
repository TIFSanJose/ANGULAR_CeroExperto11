import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';


@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})

export class ReactiveComponent implements OnInit {

  forma       : FormGroup = new FormGroup({});
  campoValido : string    = "[class.is-invalid]";

  constructor(  private fb          : FormBuilder,
                private validadores : ValidadoresService ) { 
    this.crarFormulario();
    this.cargarDatos();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  crarFormulario(){
/**
 * Formulario Reactivo. Definicion del formulario reactivo.
 * Los campos del formulario los defino usando en FormBilder = fb.-
 */
    this.forma = this.fb.group({
/**
 * Definicion de los campos del formulario
 * nombreCampo : ['valorDelCampo', Validaciones Syncronas, Validaciones Asyncronas]
 * Si se coloca mas de una validacion deben ir dentro de una array 
 * nombreCampo : ['valorDelCampo', [VS.1, VS.2, VS.3], [VAs.1, VAs.2]]
 * 
 */
      nombre   : ['ramon'   , [Validators.required, Validators.minLength(5) ] ],
      apellido : ['da rosa' , [  
                                  Validators.required, 
                                  Validators.minLength(5),
                                  this.validadores.noHerrera     ]],
      usuario   : ['' , , this.validadores.existeUsuario ], 
      correo   : ['r@r.com' , [Validators.required, Validators.email        ] ], 
      pass1    : ['', [ Validators.required ]],
      pass2    : ['', [ Validators.required ]],

/**
 * FormGroup anidado. 
 * 
 */   direccion : this.fb.group({
        ciudad  : ['', Validators.required ],
        calle   : ['', Validators.required ],

      }),

      pasatiempos : this.fb.array([])
    }, 
      { 
        Validators : this.validadores.passNoIguales('pass1', 'pass2')
    });
  }

  cargarDatos(){
    // this.forma.setValue({
      this.forma.reset({
      nombre      : "Raton",
      apellido    : "Perez",
      correo      : "ratonperez@prb.com",
      pass1       : '123',
      pass2       : '123',
      direccion   : {
        ciudad    : "mexico",
        calle     : "nido"
      }      
    });
  }

  guardar(){
    console.log(this.forma);
    console.log(this.forma.valid);

    if( this.forma.invalid ){
        return Object.values( this.forma.controls ).forEach( control => {
          
          if( control instanceof FormGroup ){
            Object.values( this.forma.controls ).forEach( control => control.markAsTouched())
          }else{
            control.markAsTouched();

          }
        })
    }

    this.forma.reset();
    
  }

  agregarPasatiempo(){
    this.pasatiempos.push( this.fb.control('', Validators.required) )  
  }

  borrarPasatiempo(index : number ){
    this.pasatiempos.removeAt(index);
  }

  campoNoValido( campoNombre: string ){
    return this.forma.get( campoNombre )?.invalid;
  }

  direccionNoValida( direccion : string ){
    return this.forma.get( 'direccion' )?.get( direccion )?.invalid
  }

  passNoIdenticas(){
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass2')?.value;

    return (pass1 === pass2) ? false : true;
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }

  crearListeners(){
/**
 * Me suscribo al observable.
 * Para cuando el formulario tenga un cambio puedo recibir ese alerta y hacer otra
 * cosa.
 */
    this.forma.valueChanges.subscribe( valor => {
      console.log({valor});
      
    });

/**
 * Me suscribo al estado del formulario, y quedo a la espera de su cambio 
 * de estado
 */
    this.forma.statusChanges.subscribe( status => {
      console.log( {status} );
      
    })

/**
 * Me puedo suscribir a los cambios de un solo campo de formulario, o de FormControl.
 * 
 *  */

  this.forma.get('nombre').valueChanges.subscribe( console.log );
  
  }



}
