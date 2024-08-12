import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { getCounter } from '../state/counter.selector';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-counter-output',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-output.component.html',
  styleUrl: './counter-output.component.scss'
})
export class CounterOutputComponent {
  counter$: Observable<number> = this.store.select(getCounter);
  constructor(private store: Store<AppState>) {}
}
