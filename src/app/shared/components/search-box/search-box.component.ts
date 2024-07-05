import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject();
  private debouncerSubscription?: Subscription;

  @ViewChild('txtInput')
  tagInput!: ElementRef<HTMLInputElement>;

  @Input() placeholder: string = 'Buscar...';
  @Input() initialTerm: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe;
  }

  emitValue(): void {
    const value = this.tagInput.nativeElement.value;
    this.tagInput.nativeElement.value = '';
    this.onValue.emit(value);
  }

  onKeyPress(search: string): void {
    if (!search) {
      return;
    }
    this.debouncer.next(search);
  }
}
