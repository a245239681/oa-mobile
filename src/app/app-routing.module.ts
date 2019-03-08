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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
