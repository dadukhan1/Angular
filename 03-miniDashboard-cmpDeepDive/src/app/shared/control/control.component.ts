import {
  Component,
  contentChild,
  ElementRef,
  HostBinding,
  HostListener,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  // host: {
  //   class: 'control',
  // },
})
export class ControlComponent {
  @HostBinding('class') className = 'control';
  private control =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  label = input.required<string>();
  @HostListener('click') onClick() {
    console.log(this.control());
  }
}
