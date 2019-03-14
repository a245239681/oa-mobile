import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddEditPhrasingPage } from './add-edit-phrasing.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditPhrasingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddEditPhrasingPage]
})
export class AddEditPhrasingPageModule {}
