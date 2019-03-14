import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VerificationComponent } from './verification/verification.component';
import { IonicModule } from '@ionic/angular';
import { HandleinfoComponent } from './handleinfo/handleinfo.component';
import { FormsModule } from '@angular/forms';
import { AttachmentlistComponent } from './attachmentlist/attachmentlist.component';
import { CirculationinfoComponent } from './circulationinfo/circulationinfo.component';
import { SignComponent } from './sign/sign.component';
import { DepartmentSelectComponent } from './department-select/department-select.component';
import { NextSelectComponent } from './next-select/next-select.component';
import { ReadercomponentComponent } from './readercomponent/readercomponent.component';


@NgModule({
    declarations: [
        VerificationComponent,
        HandleinfoComponent,
        AttachmentlistComponent,
        CirculationinfoComponent,
        SignComponent,
        DepartmentSelectComponent,
        NextSelectComponent,
        ReadercomponentComponent
    ],
    imports: [
        IonicModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        VerificationComponent,
        HandleinfoComponent,
        AttachmentlistComponent,
        CirculationinfoComponent,
        SignComponent,
        DepartmentSelectComponent,
        NextSelectComponent,
        ReadercomponentComponent
    ]
})
export class ComponentsModule { }
