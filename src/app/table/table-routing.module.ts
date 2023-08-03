import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:[
      { path: 'register', component: RegisterPageComponent },
      { path: 'table',    component: TablePageComponent    },
      { path: 'edit/:id', component: EditPageComponent     },
      { path: ':id',      component: EditPageComponent     },
      { path: '**',       component: TablePageComponent    },
    ]
  }
]





@NgModule({
  imports: [ RouterModule.forChild( routes )],
  exports: [ RouterModule ],

})
export class TableRoutingModule { }

