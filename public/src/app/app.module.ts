import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header/header.component';
import { NoteComponent } from './modules/note/note/note.component';
import { LoginComponent } from './modules/login/login/login.component';
import { RegisterComponent } from './modules/register/register/register.component';
import { DeveloperComponent } from './modules/developer/developer/developer.component';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarComponent } from './shared/components/snackbar/snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NoteComponent,
    LoginComponent,
    RegisterComponent,
    DeveloperComponent,
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
