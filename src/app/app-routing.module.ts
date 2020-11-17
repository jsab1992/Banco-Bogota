import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FromComponent } from '../app/components/pages/from/from.component';
import { TableComponent } from '../app/components/pages/table/table.component';
const routes: Routes = [
  {path: 'table', component: TableComponent},
  {path: 'form/:id', component: FromComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'table'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
