import { Directive, ElementRef, HostListener, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appZoom]',
})
export class Zoom {

  //cuanto se agranda
  appZoom = input<number>(1.05);

  private el = inject(ElementRef);
  private render = inject(Renderer2);

  //al pasar el mouse la agrando
  @HostListener('mouseenter') alEntrar() {
    this.render.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s');
    this.render.setStyle(this.el.nativeElement, 'transform', 'scale(' + this.appZoom() + ')');
  }

  //al sacar el mouse vuelve a su tamaño
  @HostListener('mouseleave') alSalir() {
    this.render.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }
}
