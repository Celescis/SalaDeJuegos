import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { QuiensoyComponent } from './pages/quiensoy/quiensoy.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { ListadoResultadosComponent } from './pages/listado-resultados/listado-resultados.component';

const routes: Routes = [
  { path: 'listado', component: ListadoResultadosComponent },
  { path: 'encuesta', component: EncuestaComponent },
  {
    path:'menuJuegos',
    loadChildren:() => import('./pages/juegos/juegos-routing.module').then((m) => m.JuegosRoutingModule)
  },
  { path: 'quiensoy', component: QuiensoyComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
