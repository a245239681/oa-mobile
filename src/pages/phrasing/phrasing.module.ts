import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PhrasingPage } from './phrasing.page';
import { AddEditPhrasingPageModule } from '../add-edit-phrasing/add-edit-phrasing.module';

const routes: Routes = [
  {
    path: '',
    component: PhrasingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditPhrasingPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PhrasingPage]
})
export class PhrasingPageModule {}
