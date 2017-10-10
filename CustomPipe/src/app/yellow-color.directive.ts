import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appYellowColor]'
})
export class YellowColorDirective {
  
  @HostListener('mouseenter')  onHover(){
    console.log("mouse on hover");
    this.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave')
  onLeave(){
    console.log("mouse on leave");
    this.backgroundColor = '';
  }

  @HostBinding('style.backgroundColor') backgroundColor = '';
}

// import { Directive, HostListener, Input, ElementRef, Renderer2, HostBinding } from '@angular/core';

// @Directive({
//   selector: '[appYellowColor]'
// })
// export class YellowColorDirective {

//   constructor(private renderer: Renderer2, private el: ElementRef) { }
  
//   @HostListener('mouseenter', ['$event'])
//   onHover(el){
//     console.log("raton sobre parrafo");
//     this.renderer.setStyle(this.el.nativeElement, 'background-color', 'yellow');
//     this.backgroundColor = 'blue';
//   }

//   @HostListener('mouseleave')
//   onOver(){
//     console.log("me voy del elemento");
//     this.renderer.removeStyle(this.el.nativeElement, 'background-color');
//   }
// }
