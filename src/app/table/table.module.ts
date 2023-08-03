import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { LayoutComponent } from './layout/layout.component';
import { TablePageComponent } from './pages/table-page/table-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { TableRoutingModule } from './table-routing.module';
import { FormsComponent } from './components/forms/forms.component';
import { DeleteComponent } from './components/delete/delete.component';


@NgModule({
  declarations: [
    LayoutComponent,
    TablePageComponent,
    EditPageComponent,
    RegisterPageComponent,
    FormsComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class TableModule { }
