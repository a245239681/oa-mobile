import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DocumentRelatedPage } from './document-related.page';
import { ComponentsModule } from 'src/components/components.module';

// const routes: Routes = [
//   {
//     path: '',
//     component: DocumentRelatedPage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule
    // RouterModule.forChild(routes)
  ],
  declarations: [DocumentRelatedPage],
  entryComponents: [DocumentRelatedPage]
})
export class DocumentRelatedPageModule {}
