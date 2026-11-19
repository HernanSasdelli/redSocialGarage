import { Directive, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appOcultar]',// el componente sin vista
})
export class Ocultar {

  //el molde del elemento y el lugar donde se dibuja
  private template = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

  
  appOcultar = input<boolean>(false);

  //en cada cambio me fijo si tengo que dibujar o no el elemento
  ngOnChanges() {
    if (this.appOcultar()) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.template);
    }
  }
}