import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";
import * as moment from 'moment';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private angularFirestore:AngularFirestore, private firestore: Firestore, public userService:UserService) { }

  traer(coleccion:string){
    return collectionData(collection(this.firestore, coleccion));
  }

  traerMensajesOrdenados(){
    const col = this.angularFirestore.collection("chats", (ref:any) => ref.orderBy('fecha', 'asc'));
    return col.valueChanges();
  }

  guardarMensaje(mensaje:string, correo:string, nombre:string){
    const col = collection(this.firestore, 'chats');
    addDoc(col, {mensaje: mensaje, userEmail: correo, userName:nombre, fecha:moment(new Date()).format('DD-MM-YYYY HH:mm:ss')});
  }
}
