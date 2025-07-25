import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  host: {
    '(click)': 'onChangePage($event)',
  },
})
export class SafeLinkDirective {
  queryParam = input('myapp', { alias: 'appSafeLink' });
  private hostElement = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('hello duniya ');
  }

  onChangePage(event: MouseEvent) {
    const shouldChnage = window.confirm('Do you want to redirect');
    if (shouldChnage) {
      //   const address = (event.target as HTMLAnchorElement).href;
      //   (event.target as HTMLAnchorElement).href = address + this.queryParam();
      const address = this.hostElement.nativeElement.href; // Dependcy Injection Approch
      this.hostElement.nativeElement.href = address + this.queryParam();
      return;
    }
    event.preventDefault();
  }
}
