import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public formRegister!: FormGroup;
  public user?: User;
  public message: string = '';
  public loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.setValidatorsForm();
  }

  public setValidatorsForm(): void {
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  public setRegisterUser(): void {
    this.loading = true;
    this.user = {
      email: this.formRegister.value.email,
      senha: this.formRegister.value.password,
      nome: this.formRegister.value.name
    }

    this.userService
    .setRegisterUser(this.user)
    .subscribe(
      () => {
        this.message = 'Usuário Cadastrado com Sucesso.';
        this.router.navigate(['/login']);
      },
      () => {
        this.snackbarService.open('Problemas para Cadastrar Usuário','snackbar-error');
      }
    )
    .add(() => this.loading = false);
  }
}
