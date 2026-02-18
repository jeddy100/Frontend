import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Centre } from '../../component/centre/centre';

const routes: Routes = [
  { path: '', component: Centre }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentresRoutingModule { }
