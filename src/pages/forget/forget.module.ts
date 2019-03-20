import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForgetPage } from './forget.page';
import { ForgetModulePage } from './forget-module/forget-module.page';

const routes: Routes = [
  {
    path: '',
    component: ForgetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgetPage,ForgetModulePage]
})
export class ForgetPageModule {

}
