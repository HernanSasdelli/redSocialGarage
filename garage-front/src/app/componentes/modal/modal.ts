import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  titulo = input<string>('');
  texto = input<string>('');
  textoBoton = input<string>('Aceptar');

  aceptar = output<void>();

  tocarBoton() {
    this.aceptar.emit();
  }
}