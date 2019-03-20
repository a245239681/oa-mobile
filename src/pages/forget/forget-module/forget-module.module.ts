import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormControl } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForgetModulePage } from './forget-module.page';

const routes: Routes = [
  {
    path: '',
    component: ForgetModulePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgetModulePage]
})
export class ForgetModulePageModule {
  name = new FormControl('');
}
