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


@NgModule({
    declarations: [
        VerificationComponent,
        HandleinfoComponent,
        AttachmentlistComponent,
        CirculationinfoComponent,
        SignComponent,
        DepartmentSelectComponent,
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
    ]
})
export class ComponentsModule { }
