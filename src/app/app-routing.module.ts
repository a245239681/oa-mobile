import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: '../pages/login/login.module#LoginPageModule' },
  { path: 'tabs', loadChildren: '../pages/tabs/tabs.module#TabsPageModule' },
  { path: 'main-index', loadChildren: '../pages/main-index/main-index.module#MainIndexPageModule' },
  { path: 'addresslist', loadChildren: '../pages/addresslist/addresslist.module#AddresslistPageModule' },
  { path: 'mine', loadChildren: '../pages/mine/mine.module#MinePageModule' },
  { path: 'documentlist', loadChildren: '../pages/documentlist/documentlist.module#DocumentlistPageModule' },
  { path: 'havedonework', loadChildren: '../pages/havedonework/havedonework.module#HavedoneworkPageModule' },
  { path: 'documentdetail', loadChildren: '../pages/documentdetail/documentdetail.module#DocumentdetailPageModule' },
  { path: 'submission', loadChildren: '../pages/submission/submission.module#SubmissionPageModule' },
  { path: 'person-select', loadChildren: '../pages/person-select/person-select.module#PersonSelectPageModule' },
  { path: 'personal-information', loadChildren: '../pages/personal-information/personal-information.module#PersonalInformationPageModule' },
  { path: 'change-password', loadChildren: '../pages/change-password/change-password.module#ChangePasswordPageModule' },
  { path: 'phrasing', loadChildren: '../pages/phrasing/phrasing.module#PhrasingPageModule' },
  { path: 'qr-code', loadChildren: '../pages/qr-code/qr-code.module#QrCodePageModule' },
  { path: 'end-action', loadChildren: '../pages/end-action/end-action.module#EndActionPageModule' },
  { path: 'add-edit-phrasing', loadChildren: '../pages/add-edit-phrasing/add-edit-phrasing.module#AddEditPhrasingPageModule' },
  { path: 'handover-person-select', loadChildren: '../pages/handover-person-select/handover-person-select.module#HandoverPersonSelectPageModule' },
  { path: 'send-action-tree', loadChildren: '../pages/send-action-tree/send-action-tree.module#SendActionTreePageModule' },
  { path: 'secretinfoadvice', loadChildren: '../pages/secretinfoadvice/secretinfoadvice.module#SecretinfoadvicePageModule' },
  { path: 'return-back', loadChildren: '../pages/return-back/return-back.module#ReturnBackPageModule' },
  { path: 'mail-list', loadChildren: '../pages/mail-list/mail-list.module#MailListPageModule' },
  { path: 'document-related', loadChildren: '../pages/document-related/document-related.module#DocumentRelatedPageModule' },
  { path: 'sign-sussces', loadChildren: '../pages/sign-sussces/sign-sussces.module#SignSusscesPageModule' },
  { path: 'forget', loadChildren: '../pages/forget/forget.module#ForgetPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
