import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubmissionPage } from './submission.page';
import { ComponentsModule } from 'src/components/components.module';
import { SignaturepadPageModule } from '../signaturepad/signaturepad.module';
import { CountersignModule } from 'src/components/countersign/countersign.module';
import { PersonSelectPage } from '../person-select/person-select.page';

const routes: Routes = [
  {
    path: '',
    component: SubmissionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SignaturepadPageModule,
    CountersignModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubmissionPage],
})
export class SubmissionPageModule {}
