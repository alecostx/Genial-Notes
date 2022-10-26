import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  public open(
    data?: any,
    style?: string,
    options?: MatSnackBarConfig
  ): void {
    options = new MatSnackBarConfig();
    options.duration = 4000;
    options.panelClass = style;

    options.data = data;

    this.snackbar.openFromComponent(SnackbarComponent, options);
  }
}
