import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { JuegoPropioComponent } from './juego-propio/juego-propio.component';

@NgModule({
  declarations: [
    PreguntadosComponent,
    JuegoPropioComponent
  ],
  imports: [
    CommonModule
  ]
})
export class JuegosModule { }
