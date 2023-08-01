import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo: string = '';
  password: string = '';
  correoValido: boolean = false;
  passValido: boolean = false;

  constructor(
    private userService: UserService) { }


  login() {
    this.userService.login(this.correo, this.password);
  }

  validarCorreo() {
    if (this.correo.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/)) {
      this.correoValido = true;
    } else {
      this.correoValido = false;
    }
  }

  validarPass() {
    if (this.password.match(/[0-9a-zA-Z]{6,}/)) {
      this.passValido = true;
    } else {
      this.passValido = false;
    }
  }

  seleccionarUsuario(opcion: number) {
    if (opcion === 1) {
      this.correo = 'admin@admin.com';
      this.password = '111111';
      this.correoValido = true;
      this.passValido = true;
    } else if (opcion === 2) {
      this.correo = 'empleado@empleado.com';
      this.password = '222222';
      this.correoValido = true;
      this.passValido = true;
    }
  }

}
