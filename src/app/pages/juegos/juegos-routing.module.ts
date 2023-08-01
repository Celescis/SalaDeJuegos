import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuJuegosComponent } from '../menu-juegos/menu-juegos.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { CommonModule } from '@angular/common';
import { JuegoPropioComponent } from './juego-propio/juego-propio.component';


const routes: Routes = [
  {path:'juego-propio', component: JuegoPropioComponent},
  {path:'preguntados', component: PreguntadosComponent},
  {path:'ahorcado', component: AhorcadoComponent},
  {path:'mayor-menor', component: MayorMenorComponent},
  {path:'', component: MenuJuegosComponent},

];

@NgModule({
  declarations: [PreguntadosComponent, JuegoPropioComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class JuegosRoutingModule {}