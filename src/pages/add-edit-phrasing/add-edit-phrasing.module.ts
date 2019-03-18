import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddEditPhrasingPage } from './add-edit-phrasing.page';
import { ComponentsModule } from 'src/components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ComponentsModule],
  declarations: [AddEditPhrasingPage],
  entryComponents: [AddEditPhrasingPage]
})
export class AddEditPhrasingPageModule {}
