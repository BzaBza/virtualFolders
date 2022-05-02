import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnChanges{
  @Input() shouldFocused!: boolean;
  constructor(
    private elementRef: ElementRef
  ){}

  ngOnChanges(changes: SimpleChanges) {
    if(this.shouldFocused) {
      this.elementRef.nativeElement.focus();
    }
  }
}
