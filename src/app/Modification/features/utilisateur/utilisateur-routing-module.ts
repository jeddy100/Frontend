import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Inscription } from '../../component/inscription/inscription';
import { Login } from '@/app/pages/auth/login';

const routes: Routes = [
  { path: 'login', component: Login }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
