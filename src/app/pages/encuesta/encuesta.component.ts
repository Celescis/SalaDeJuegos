import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { SwalService } from 'src/app/services/swal.service';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
})
export class EncuestaComponent implements OnInit {

  nameValido: boolean = false;
  apellidoValido: boolean = false;
  edadValidada: boolean = false;
  telefonoValido: boolean = false;
  selecValidado: boolean = false;
  checkValidado: boolean = false;
  arrayDeUsuarios: any[] = []
  edad: number = 0;
  nombre: string = "";
  apellido: string = "";
  telefono: string = "";
  mostrarSpinner = false;
  selectedOption: string = '';


  constructor(
    private userService: UserService,
    private encuestaService: EncuestaService,
    private notificationService: ToastService,
    private serviceAlert: SwalService
  ) {

  } // end of constructor

  ngOnInit(): void {

  }

  generarEncuesta() {

    if (this.nameValido && this.apellidoValido && this.edadValidada && this.telefonoValido && this.checkValidado && this.selecValidado) {
      const encuesta = {
        apellido: this.apellido,
        edad: this.edad,
        telefono: this.telefono,
        nombre: this.nombre,
        mail: this.userService.emailLogueado,
        checkbox: this.getValoresCheck(),
        select: this.getValorSelect(),
        radio: this.getValorSeleccionadoDelRadio("recomendacion")
      }

      this.encuestaService.guardarEncuesta(encuesta);
      this.notificationService.showSuccess("Encuesta enviada", "Muchas gracias!");
    }
    else {
      this.serviceAlert.crearSwal(`Revisa los campos`, "Error al enviar la encuesta", 'error');
    }

  }

  getValoresCheck() {
    const checkboxes = document.querySelectorAll('input[name="juegos"]:checked');
    const selectedValues: string[] = [];

    checkboxes.forEach((value: Element) => {
      const checkbox = value as HTMLInputElement;
      selectedValues.push(checkbox.value);
    });

    console.log(checkboxes);
    return selectedValues;
  }

  getValorSeleccionadoDelRadio(nombreDelRadio: string) {
    const selectedRadio = document.querySelector(`input[name=${nombreDelRadio}]:checked`) as HTMLInputElement;
    if (selectedRadio) {
      const selectedValue = selectedRadio.value;
      return selectedValue;
    } else {
      return 0;
    }
  }

  getValorSelect() {
    const selectElement = document.getElementById("juegoAgregar") as HTMLSelectElement;
    const selectedValue = selectElement.value;
    return selectedValue;
  }



  verificarQueExisteEmail(emailIngresado: string) {
    let existeElCorreo = false;
    for (const unUsuario of this.arrayDeUsuarios) {
      if (unUsuario.emailUsuario == emailIngresado) {
        existeElCorreo = true;
        break;
      }
    }
    return existeElCorreo;
  }


  validarCheck() {
    if (this.getValoresCheck().length != 0) {
      this.checkValidado = true;
    }
    else {
      this.checkValidado = false;
    }
  }

  validarName() {
    if (this.nombre.match(/[a-zA-Z]/) && this.nombre.length < 15 && this.nombre.length > 2) {
      this.nameValido = true;
    } else {
      this.nameValido = false;
    }
  }

  validarApellido() {
    if (this.apellido.match(/[a-zA-Z]/) && this.apellido.length < 15 && this.apellido.length > 2) {
      this.apellidoValido = true;
    } else {
      this.apellidoValido = false;
    }
  }

  validarEdad() {
    if (this.edad > 17 && this.edad < 100) {
      this.edadValidada = true;
    } else {
      this.edadValidada = false;
    }
  }

  validarTelefono() {
    if (this.telefono.match(/[1-9]/) && (this.telefono.length == 8 || this.telefono.length == 10)) {
      this.telefonoValido = true;
    } else {
      this.telefonoValido = false;
    }
  }

  validarSelect() {
    const selectElement = document.getElementById("juegoAgregar") as HTMLSelectElement;
    if (selectElement.value != '') {
      this.selecValidado = true;
    } else {
      this.selecValidado = false;
    }
  }
}