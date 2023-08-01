import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  usuario = { correo: "", password: "", userName: "" };
  correoValido: boolean = false;
  passValido: boolean = false;
  nameValido: boolean = false;


  constructor(
    private userService: UserService) { }


  register() {
    this.userService.register(this.usuario);
  }

  validarName() {
    if (this.usuario.userName.match(/[a-zA-Z]/)) {
      this.nameValido = true;
    } else {
      this.nameValido = false;
    }
  }

  validarCorreo() {
    if (this.usuario.correo.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/)) {
      this.correoValido = true;
    } else {
      this.correoValido = false;
    }
  }

  validarPass() {
    if (this.usuario.password.match(/[0-9a-zA-Z]{6,}/)) {
      this.passValido = true;
    } else {
      this.passValido = false;
    }
  }

}
