import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ListadoService {

  constructor(private firestore:Firestore) { }
  
  traer(nombreDeLaColeccion:string){
    return collectionData(collection(this.firestore, nombreDeLaColeccion));
  }

  guardarResultado(resultado:any)
  {
    const col = collection(this.firestore,'resultadosJuegos');
    addDoc(col, 
      {juego:resultado.juego,
      puntaje:resultado.puntaje,
      victoria:resultado.victoria,
      mail:resultado.mail,
      fecha:moment(new Date()).format('DD-MM-YYYY HH:mm:ss')});
  }
}
