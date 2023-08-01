import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private firestore:Firestore) { }

  guardarEncuesta(encuesta:any){
    const col = collection(this.firestore, 'encuesta');
    addDoc(col, {apellido: encuesta.apellido,
      checkbox:encuesta.checkbox, 
      edad:encuesta.edad, 
      nombre:encuesta.nombre, 
      radio:encuesta.radio, 
      select:encuesta.select, 
      mail:encuesta.mail, 
      telefono:encuesta.telefono, 
      fecha:moment(new Date()).format('DD-MM-YYYY HH:mm:ss')});
  }
}
