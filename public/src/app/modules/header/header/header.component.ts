import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isOpenNavBar: boolean = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public get nameUser(): string {
    return this.userService.getNameUserLocalData();
  }

  public get isLoggedUser(): boolean {
    return this.userService.getIdUserLoggedLocalData() ? true : false;
  }

  public setToggleNavBar(): void {
    this.isOpenNavBar = this.isOpenNavBar ? false : true;
  }
}
