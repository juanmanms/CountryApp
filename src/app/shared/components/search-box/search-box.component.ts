import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent {
  @ViewChild('txtInput')
  tagInput!: ElementRef<HTMLInputElement>;

  @Input() placeholder: string = 'Buscar...';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  emitValue(): void {
    const value = this.tagInput.nativeElement.value;
    this.tagInput.nativeElement.value = '';
    this.onValue.emit(value);
  }
}
