import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HavedoneworkPage } from './havedonework.page';

const routes: Routes = [
  {
    path: '',
    component: HavedoneworkPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HavedoneworkPage]
})
export class HavedoneworkPageModule {}
