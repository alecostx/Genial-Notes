import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { DeveloperComponent } from './modules/developer/developer/developer.component';
import { LoginComponent } from './modules/login/login/login.component';
import { NoteComponent } from './modules/note/note/note.component';
import { RegisterComponent } from './modules/register/register/register.component';

const routes: Routes = [
  { path: '', component: NoteComponent },
  { path: 'developer', component: DeveloperComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
