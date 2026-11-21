import { Directive, ElementRef, inject, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAlerta]',
})
export class Alerta implements OnInit {

  private el = inject(ElementRef);
  private render = inject(Renderer2);

  ngOnInit() {
    const cartel = this.el.nativeElement;

    this.render.setStyle(cartel, 'display', 'block');
    this.render.setStyle(cartel, 'background', '#d32f2f');
    this.render.setStyle(cartel, 'color', 'white');
    this.render.setStyle(cartel, 'font-weight', '700');
    this.render.setStyle(cartel, 'padding', '12px 16px');
    this.render.setStyle(cartel, 'border-radius', '10px');
    this.render.setStyle(cartel, 'border-left', '6px solid #7f0000');
    this.render.setStyle(cartel, 'margin', '12px 0');

    //sacudon: se mueve a los costados y vuelve
    cartel.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-8px)' },
        { transform: 'translateX(8px)' },
        { transform: 'translateX(-8px)' },
        { transform: 'translateX(0)' },
      ],
      { duration: 400 }
    );
  }
}