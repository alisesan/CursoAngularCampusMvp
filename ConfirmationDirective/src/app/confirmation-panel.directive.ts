import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appConfirmationPanel]'
})
export class ConfirmationPanelDirective {
  @Input('confirm') execFuction: Function;

  @HostListener('click', ['$event'])
  onClick() {
    const confirmed = window.confirm('¿Está seguro de guardar?');

    if(confirmed){
      this.execFuction();
    }
  }
}
