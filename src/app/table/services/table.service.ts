import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments/environments';
import { Observable, catchError, of, map } from 'rxjs';
import { Register } from '../interfaces/register.interface';



@Injectable({providedIn: 'root'})




export class TableService {

  // Obtenemos la url del server
  private baseUrl: string = environments.baseUrl

  // Hacemos las inyecciones necesarias
  constructor( private httpClient: HttpClient ) { }


  /**
   *  Este metodo nos permirte traer la informacion en este caso los registros
   * @param void
   * @returns retorna un observable que emite un arreglo de registros
   */
  public getRegister(): Observable<Register[]>{
    return this.httpClient.get<Register[]>(`${this.baseUrl}/registro`)
  }


  /**
   *  Este metodo nos permite agregar datos a la tabla
   * @param data
   * @returns Observable que emite un registro
   */
  public addData( data: Register ): Observable<Register>{
    return this.httpClient.post<Register>(`${this.baseUrl}/registro/`,data)
  }



  /**
   * Nos devuelve la informacion de la data por medio del id
   * @param id => el id de tipo string
   * @returns Retorna  un observable que emite un registro
   */
  public getDataById( id: string): Observable< Register | undefined >{
    return this.httpClient.get<Register>(`${this.baseUrl}/registro/${id}`)
    // por medio del operador pipe le estableces que si hay un error le asigne undefined
    .pipe(
      catchError( error => of( undefined ))
    )
  }

  /**
   *  Este metodo nos permite actualizar la data que ya tenemos
   * esto lo hacemos pasandole el id de la data y le pasamos la data ya luego actualizada
   * @param data la data de tipo register
   * @returns Retorna un Observable que emite un dato de tipo register
   */
  public updateData ( data: Register ): Observable<Register> {
    if(! data ) throw new Error('Data es required')
    return this.httpClient.patch<Register>(`${this.baseUrl}/registro/${data.id}`, data)
  }


  /**
   * Este metodo nos permite eliminar una data por medio del id
   * @param id => de tipo number
   * @returns retorna un Obseravble que emite un booleano
   */
  public deleteDataById( id: number ): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/registro/${id}`)
    .pipe(
      map( resp => true ),
      catchError( error => of( false ))
    )
  }



}
