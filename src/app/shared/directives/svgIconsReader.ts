import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[svgIconReader]',
})
export class SvgIconsReader {
  @Input() set svgIconReader(svgContent: string) {
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', svgContent);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}
