import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FileuploadComponent } from '../app/fileupload/fileupload.component';
import { FileUpdateComponent } from './file-update/file-update.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'file-upload',
        component: FileuploadComponent
      },
      {
        path: 'file-update',
        component:FileUpdateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
