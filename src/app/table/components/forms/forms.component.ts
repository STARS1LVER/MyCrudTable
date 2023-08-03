import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableService } from '../../services/table.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from '../../interfaces/register.interface';
import { switchMap,delay, filter } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
@Component({
  selector: 'table-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  /**
   * Creamos esta propiedad
   * para controlar el formulario que en este caso sera reactivo
   * y luego los conectaremos con el html
   */
  public dataForm: FormGroup = this.formB.group({
    id: [0],
    nombre:  ['', [Validators.required]],
    apellido:   ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.minLength(10)]],
    pais:    ['', [Validators.required]],
    ciudad:       ['', [Validators.required]],
    profesion: ['', [Validators.required]],
  })




  constructor(
    private formB: FormBuilder,
    private tableService: TableService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {

    // Verificamos si la url tiene la palabra edit
    if( !this.router.url.includes('edit')) return;




    // usamos el activated route para acceder a los parametros
    this.activateRoute.params
    // accedemos el operador pipe para acceder a los parametros de la ruta
    .pipe(
      // y con el operador swicthMap transformamos la respuesta y accedemos al parametro
      // id y llamamos al metodo obtener por id y le pasamos el id
      switchMap( ({id}) => this.tableService.getDataById( id ) )
    )
    // nos suscribimos para obtener esa data que nos da el id
    .subscribe( data => {
      // si no existe devuelveme al inicio
      if( !data ) return this.router.navigateByUrl('')

      // por medio del metodo reset establecemos los valores en este caso los que tiene el objeto que llamamos
      // por el id
      this.dataForm.reset( data)
      return
    })


  }

  /**
   * Este metodo es un getter
   * para obtener los datos del formulario
   * @returns devuelve un objeto de tipo Register
   */
  get obtenerDatos(): Register {
    const datos = this.dataForm.value as Register
    return datos
  }



  /**
   * Este metodo hace el on Submit que nos permite hacer la funcion
   * Submit el cual nos aplica varios metodos ya sea actualizar
   * o agregar datos
   *
   * @returns void
   */
  public onSubmit():void{

    // si el formulario esta invalido no hagas nada
    if( this.dataForm.invalid ) return

    // si obtener registro tiene un id
    // llama al metodo update y actualiza la data
    if( this.obtenerDatos.id  ){
      this.tableService.updateData( this.obtenerDatos )
      .pipe(

      )
      .subscribe( {
        next: (data) => {
          console.log('data actualizada')
          this.router.navigateByUrl('')
        },
        error: () => {
          console.log('Hay un error')
        }
      })
      return
    }


    // de lo contrario llama al metodo agregar data y
    // pasale el objeto al metodo add data
    this.tableService.addData( this.obtenerDatos )
    .subscribe( data =>{
      console.log('data creada')
      // llevame a al inicio
      this.router.navigateByUrl('')
    })
  }

  public deleteData(): void {
    this.tableService.deleteDataById( this.obtenerDatos.id )
    .subscribe( {
      next: (resp) => {
        console.log('eliminado!')
      },
      error: () =>{
        console.log('Hay un problema!')
      }
    })
  }


  public onConfirmDelete (){

    if( !this.obtenerDatos.id ) throw new Error('id of data is required')

    const dialogRef = this.dialog.open( DeleteComponent, {
      width: '299px',


      data: this.dataForm.value,
      position: {
        top: '50px',
        bottom: '100px', // Establecer la posición vertical en píxeles o porcentaje
        left: '810px', // Establecer la posición horizontal en píxeles o porcentaje
      },

    })


    dialogRef.afterClosed()
    .pipe(
      filter( (result: boolean ) => result ),

      switchMap( ( ) => this.tableService.deleteDataById( this.obtenerDatos.id )),

      filter( (wasDeleted: boolean ) => wasDeleted)
    )
    .subscribe( () => {
      this.router.navigate([''])
    })

  }


}
