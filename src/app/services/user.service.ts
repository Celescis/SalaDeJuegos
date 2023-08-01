import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { SwalService } from './swal.service';
import * as moment from 'moment';
import { addDoc, collection, collectionData, Firestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  seLogueo: boolean = false;
  esAdmin: boolean = false;
  userInit: any;
  emailLogueado: string = "";


  constructor(private router: Router,
    private swalService: SwalService,
    private firestore: Firestore) {
  }

  login(correo: any, password: any) {
    this.emailLogueado = correo;

    firebase.auth().signInWithEmailAndPassword(correo, password).then((response) => {
      firebase.auth().currentUser?.getIdToken().then(
        (token) => {

          //hacer logs
          const col = collection(this.firestore, 'logs');
          addDoc(col, {
            userEmail: correo,
            fechaIngreso: moment(new Date()).format('DD-MM-YYYY HH:mm:ss')
          }).then(() => {
            this.seLogueo = true;
          })

          this.router.navigate(['/home']);
        }
      )

      // let userCorreo = response.user?.email ? response.user?.email : '';
      // localStorage.setItem("correo", userCorreo);
      // let logueo = this.getEmailUser()?.split('@')[0];;
      // if (logueo === 'admin') {
      //   this.esAdmin = true;
      // }
    })
      .catch(async (error) => {
        let errorMessage = error.message;

        if (errorMessage.includes('correo', 'password') || !correo.valid && !password.valid) {
          errorMessage = 'Debe ingresar un correo y contraseña correcta';

        } else if (errorMessage.includes('password') || !password.valid) {
          errorMessage = 'Por favor, ingrese una contraseña válida.';
        } else {
          errorMessage = "Usuario inexistente";
        }
        this.swalService.crearSwal(errorMessage, "ERROR", 'error');
      });
  }

  logout() {
    firebase.auth().signOut();
    this.seLogueo = false;
    this.esAdmin = false;
    this.swalService.crearSwal("Sesión cerrada", "Hasta la próxima", 'success');
    this.router.navigate(['/login']);
  }

  register(usuario: any) {
    firebase.
      auth().createUserWithEmailAndPassword(usuario.correo, usuario.password)
      .then((credential) => {
        const user = credential.user;
        if (user) {
          const col = collection(this.firestore, 'usuarios');
          addDoc(col, {
            uid: user.uid,
            userEmail: usuario.correo,
            password: usuario.password,
            userName: usuario.userName
          }).then((response) => {
            this.login(usuario.correo, usuario.password);
          })
            .catch(() => {
              this.swalService.crearSwal(`No se encontró al usuario`, "ERROR", 'error');
            })
        }
      }).catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          this.swalService.crearSwal(`Ya existe un usuario con ese email`, "No se pudo registrar", 'error');
        } else {
          this.swalService.crearSwal(`No se pudo registrar el usuario`, "ERROR", 'error');
        }
      });
  }

  getEmailUser() {
    return firebase.auth().currentUser?.email || null;
  }

  traer(coleccion: string) {
    return collectionData(collection(this.firestore, coleccion))
  }

}
