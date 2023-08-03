import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { Register } from '../../interfaces/register.interface';


@Component({
  selector: 'table-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {


  constructor(
    private dialogRef: MatDialogRef<DeleteComponent>,
    // aca le inyecctamos la info a data que viene desde el componente que usamos este dialog
    @Inject(MAT_DIALOG_DATA) private data: Register,
  ){}

  public onNoClick(): void {
    this.dialogRef.close(false)
  }


  public onConfirm(): void {
    this.dialogRef.close(true)
  }

  get register(): Register {
    const data: Register = this.data
    return data;
  }


}
