import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/components/components.module';
import { ChangePhonenumbersComponent } from './change-phonenumbers.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ComponentsModule],
  declarations: [ChangePhonenumbersComponent],
  entryComponents: [ChangePhonenumbersComponent]
})
export class ChangePhonenumbersModule {}
