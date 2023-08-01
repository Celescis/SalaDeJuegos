import { Component, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @Input() visible: boolean = false;
  mensajesDeLaBd: any[] = [];
  mensajeQueSeEnviara = "";


  constructor(private chatService: ChatService, public userService: UserService, public navBar: NavbarComponent) {}
  
  ngOnInit() {
    this.chatService.traerMensajesOrdenados().subscribe(mensajes => {
      this.mensajesDeLaBd = mensajes;
      setTimeout(() => {
        this.scrollToTheLastElementByClassName();
      }, 3);
    })
  };

  enviarMensaje() {
    this.chatService.guardarMensaje(this.mensajeQueSeEnviara, this.navBar.userEmail, this.navBar.userName);
    this.mensajeQueSeEnviara = "";
    this.scrollToTheLastElementByClassName();
  }

  scrollToTheLastElementByClassName(){
    let elements = document.getElementsByClassName('mensajes');
    let ultimo:any = elements[(elements.length - 1)];
    let toppos = ultimo.offsetTop;
    //@ts-ignore
    document.getElementById('contenedor-mensajes').scrollTop = toppos;
  }
}
