import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignaturepadPage } from './signaturepad.page';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [SignaturepadPage, SignaturePad],
  entryComponents: [SignaturepadPage],
})
export class SignaturepadPageModule { }
