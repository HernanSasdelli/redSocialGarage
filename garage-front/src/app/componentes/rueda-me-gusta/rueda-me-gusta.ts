import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-rueda-me-gusta',
  imports: [],
  templateUrl: './rueda-me-gusta.html',
  styleUrl: './rueda-me-gusta.css',
})
export class RuedaMeGusta {
  encendida = input<boolean>(false);
  cantidad = input<number>(0);

  tocar = output<void>();

  tocarRueda() {
    this.tocar.emit();
  }
}