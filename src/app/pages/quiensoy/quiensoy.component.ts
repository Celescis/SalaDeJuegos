import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiensoy',
  templateUrl: './quiensoy.component.html',
  styleUrls: ['./quiensoy.component.css']
})
export class QuiensoyComponent {
  perfil:any;
  urlApi:string = "https://api.github.com/users/Celescis";

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
      this.http.get(this.urlApi).subscribe(res => this.perfil = res);
  }
}
