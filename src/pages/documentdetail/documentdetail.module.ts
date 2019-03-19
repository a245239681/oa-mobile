
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DocumentdetailPage } from './documentdetail.page';
import { ComponentsModule } from 'src/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: DocumentdetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DocumentdetailPage],
 
})
export class DocumentdetailPageModule {}
