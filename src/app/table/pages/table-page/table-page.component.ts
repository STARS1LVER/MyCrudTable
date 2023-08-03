import { Component, OnInit } from '@angular/core';
import { TableService } from '../../services/table.service';
import { Register } from '../../interfaces/register.interface';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent implements OnInit {

  public records: Register[] = [];

  constructor( private tableService: TableService ){}


  ngOnInit(): void {
    this.refreshTable()
  }

  /**
   *
   * @param id
   */
  public deleteData( id: number ): void {
    this.tableService.deleteDataById( id )
    .subscribe({
      next: (resp) =>{
        console.log( 'eliminado ')
        this.refreshTable()
      },
      error: () => {
        console.log('hay un error')
      }
    })
  }

  /**
   *
   */
  public refreshTable(): void{
    this.tableService.getRegister()
    .subscribe({
      next: (data) => {
        this.records = data
      },
      error: () => {
        console.log('Hay un error')
      }
    })
  }


  

}


