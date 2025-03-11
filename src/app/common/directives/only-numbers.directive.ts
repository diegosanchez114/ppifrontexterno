import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumbers]',
  standalone: true
})
export class OnlyNumbersDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    let initialValue = this.el.nativeElement.value;
    
    // Remove non-numeric characters and leading zeros
    initialValue = initialValue.replace(/^0+/, '');

    // Remove non-numeric characters
    const cleanValue = initialValue.replace(/[^0-9.]/g, '');

    // Separate thousands and decimal values
    const parts = cleanValue.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    let decimalPart = parts[1];
    if (decimalPart !== undefined) 
      decimalPart = '.' + decimalPart;
    else decimalPart = '';

    // Update the input field value
    this.el.nativeElement.value = integerPart + decimalPart;    
  }

}