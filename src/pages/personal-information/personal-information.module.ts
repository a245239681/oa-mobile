import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PersonalInformationPage } from './personal-information.page';
import { ChangePhonenumbersModule } from './change-phonenumbers/change-phonenumbers.module';

const routes: Routes = [
  {
    path: '',
    component: PersonalInformationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePhonenumbersModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PersonalInformationPage]
})
export class PersonalInformationPageModule {}
