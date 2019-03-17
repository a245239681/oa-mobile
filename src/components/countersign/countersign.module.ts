import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/components/components.module';
import { CountersignComponent } from './countersign.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CountersignComponent],
  entryComponents: [CountersignComponent]
})
export class CountersignModule {}
