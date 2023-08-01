import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  userName: string = "";
  userEmail: string = "";
  expandido: boolean = false
  @Output() sideBarChange = new EventEmitter<boolean>();

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.traer("usuarios").subscribe(usuarios => {
      for (const unUser of usuarios) {

        if (this.userService.getEmailUser() == unUser["userEmail"]) {
          this.userName = unUser["userName"];
          this.userEmail = unUser["userEmail"];
          break;
        }
      }
    })
  };

  cerrarSesion() {
    this.userService.logout();
    this.expandido = false;
  }

  abrirChat() {
    this.expandido = !this.expandido;
    this.sideBarChange.emit(this.expandido);
  }

}
