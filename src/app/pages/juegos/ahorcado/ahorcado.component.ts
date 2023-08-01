import { Component } from '@angular/core';
import { ListadoService } from 'src/app/services/listado.service';
import { SwalService } from 'src/app/services/swal.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {

  user: any = null;
  buttonLetters: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'Ñ',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  listOfWords: string[] = [
    'PERRO',
    'SERPIENTE',
    'KOALA',
    'SAPO',
    'GATO'
  ];
  victory: boolean = false;
  activeGame: boolean = true;
  attempts: number = 6;
  score: number = 0;
  image: number | any = 0;
  word: string = '';
  hyphenatedWord: string[] = [];

  constructor(
    private toastService: ToastService,
    public loginService: UserService,
    private swalService: SwalService,
    private firestore:ListadoService
  ) {
    this.word =
      this.listOfWords[
      Math.round(Math.random() * (this.listOfWords.length - 1))
      ];
    this.hyphenatedWord = Array(this.word.length).fill('_');
  }

  ngOnInit(): void {}

  restartGame() {
    this.word =
      this.listOfWords[
      Math.round(Math.random() * (this.listOfWords.length - 1))
      ];
    this.hyphenatedWord = Array(this.word.length).fill('_');
    this.activeGame = true;
    this.attempts = 6;
    this.score = 0;
    this.image = 0;
    this.victory = false;
    this.resetClassBotones();
    this.toastService.showInfo('Reiniciando partida...', 'Ahorcado');
  } // end of restartGame

  resetClassBotones() {
    for (let index = 0; index < this.buttonLetters.length; index++) {
      const elemento = document.getElementById("boton" + index) as HTMLButtonElement;
      elemento?.classList.remove("btn-error");
      elemento?.classList.remove("btn-acierto");
      elemento?.classList.add("btn-letra");
      if (elemento != null) {
        elemento.disabled = false;
      }
    }
  }

  sendLetter(letter: string, idDelBoton: number) {
    let letterFlag: boolean = false;
    let winGame: boolean = false;

    if (this.activeGame) {
      const alreadyGuessedLetterFlag: boolean = this.hyphenatedWord.some(
        (c) => c === letter
      );
      for (let i = 0; i < this.word.length; i++) {
        const wordLetter = this.word[i];
        if (wordLetter === letter && !alreadyGuessedLetterFlag) {
          this.hyphenatedWord[i] = letter;
          letterFlag = true;
          this.score++;
          winGame = this.hyphenatedWord.some((hyphen) => hyphen == '_');
          if (!winGame) {
            this.image = this.image + '_v';
            this.activeGame = false;
            this.victory = true;
            this.createResult();
            this.toastService.showSuccess('Excelente Ganaste!!', 'Ahorcado');
            break;
          }
        }
      }

      if (!letterFlag && !alreadyGuessedLetterFlag) {
        if (this.attempts > 0) {
          this.attempts--;
          this.image++;
          this.toastService.showError('¡Te equivocaste!', 'Ahorcado');
          const elemento = document.getElementById("boton" + idDelBoton) as HTMLButtonElement;
          elemento?.classList.remove("btn-letra");
          elemento?.classList.add("btn-error");
          if (elemento != null) {
            elemento.disabled = true;
          }
          if (this.attempts === 0) {
            this.createResult();
            this.toastService.showError('Mejor suerte la proxima. Perdiste.', 'Ahorcado');
            this.activeGame = false;
          }
        }

        if (this.score > 0) {
          this.score--;
        }
      } else if (alreadyGuessedLetterFlag) {
        this.toastService.showWarning('Esta letra ya fue utilizada', 'Ahorcado');
      } else if (letterFlag) {
        if (!this.victory) {
          this.toastService.showSuccess('Acertaste!!', 'Ahorcado');
          const elemento = document.getElementById("boton" + idDelBoton) as HTMLButtonElement;
          elemento?.classList.remove("btn-letra");
          elemento?.classList.add("btn-acierto");
          if (elemento != null) {
            elemento.disabled = true;
          }
        }
      }
    } else {
      this.toastService.showWarning(
        '¿Quieres volver a jugar?',
        'Ahorcado', 'warning'
      );
    }
  }

  generarPista() {
    switch (this.word) {
      case 'PERRO':
        this.swalService.crearSwal("Animal de cuatro patas muy amistoso", "Aquí va una pista ", 'info');
        break;

      case 'SERPIENTE':
        this.swalService.crearSwal("Animal largo que se arrastra", "Aquí va una pista ", 'info');
        break;

      case 'KOALA':
        this.swalService.crearSwal("Animal perezoso que trepa árboles", "Aquí va una pista ", 'info');
        break;

      case 'SAPO':
        this.swalService.crearSwal("Animal verde acuático", "Aquí va una pista ", 'info');
        break;

      default:
        this.swalService.crearSwal("Animal peludo que ronronea", "Aquí va una pista ", 'info');
        break;
    }
  }

  createResult() {
    let resultado = {
      juego:'Ahorcado',
      puntaje: this.score,
      mail: this.loginService.emailLogueado,
      victoria:this.victory
    }

    this.firestore.guardarResultado(resultado);
  }

}
