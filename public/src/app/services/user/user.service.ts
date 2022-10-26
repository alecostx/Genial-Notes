import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = `https://localhost:7119/api/Usuario`;

  constructor(
    private http: HttpClient
  ) { }

  public setRegisterUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}`, user);
  }

  public getUserLoggedData(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${idUser}`);
  }

  public getValidateLoginUser(user: User): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${user.email}/${user.senha}`);
  }

  public setIdUserLoggedLocalData(idUser: number): void {
    localStorage.setItem('idUser', JSON.stringify(idUser));
  }

  public getIdUserLoggedLocalData(): number {
    return JSON.parse(localStorage.getItem('idUser')!);
  }

  public removeIdUserLoggedLocalData(): void {
    localStorage.removeItem('idUser');
  }

  public setNameUserLocalData(nameUser: string): void {
    localStorage.setItem('nameUser', nameUser);
  }

  public getNameUserLocalData(): string {
    return localStorage.getItem('nameUser')!;
  }

  public removeNameUserLocalData(): void {
    localStorage.removeItem('nameUser');
  }
}
