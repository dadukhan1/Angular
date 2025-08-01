import {
  Component,
  ElementRef,
  output,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent {
  // @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  enteredTitle = '';
  enteredText = '';

  add = output<{ title: string; text: string }>();

  ngAfterViewInit(): void {
    console.log('after view init');
  }

  onSubmit() {
    this.add.emit({ title: this.enteredTitle, text: this.enteredTitle });
    // this.form()?.nativeElement.reset();
    this.enteredTitle = '';
    this.enteredText = '';
  }
}
