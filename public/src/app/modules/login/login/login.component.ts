import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericReturn } from 'src/app/models/generic.model';
import { User } from 'src/app/models/user.model';
import { NoteService } from 'src/app/services/note/note.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public message: string = '';
  public formLogin!: FormGroup;
  public hasNotFoundLogin: boolean = false;
  public loading: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.setValidatorsForm();
  }

  public getValidateLoginUser(): void {
    this.loading = true;

    const user: User = {
      email: this.formLogin.value.email,
      senha: this.formLogin.value.password
    }

    this.userService
      .getValidateLoginUser(user)
      .subscribe(
        (res: GenericReturn) => { 
          if (res.status === "NotFound") {
            this.hasNotFoundLogin = true;
            this.message = 'Usuário ou Senha não encontrado';
          } else {
            this.userService.setIdUserLoggedLocalData(res.id!);
            this.noteService.setNotesLocalDataToLogin(res.id!);
            this.message = 'Usuário Logado com Sucesso';
            this.router.navigate(['/'])
          }
        },
        () => { 
          this.snackbarService.open('Houve Algum erro interno, tente novamente mais tarde!','snackbar-error')
        }
      )
      .add(() => this.loading = false);
  }

  private setValidatorsForm(): void {
    this.formLogin = this.formBuilder.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }
}
