import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Centre } from '../../component/centre/centre';
import { AuthGuard } from '../../service/utilisateur-guard';
import { RoleGuard } from '../../service/role-guard';

const routes: Routes = [
  { path: '', component: Centre,canActivate: [RoleGuard],
    data: { role: 'admin' } },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentresRoutingModule { }
