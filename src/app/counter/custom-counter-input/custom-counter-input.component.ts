import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { changeChannelName, customIncrement } from '../state/counter.action';
import { Observable } from 'rxjs';
import { getChannelName } from '../state/counter.selector';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-custom-counter-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-counter-input.component.html',
  styleUrl: './custom-counter-input.component.scss'
})
export class CustomCounterInputComponent {
  value = 0;
  channelName = 'Modifier';
  channel$: Observable<string> = this.store.select(getChannelName);

  constructor(private store: Store<AppState>) {}
  onAdd() {
    this.store.dispatch(customIncrement({ value: +this.value }));
  }

  onChangechannelName() {
    this.store.dispatch(changeChannelName({ channelName: this.channelName }));
  }

}
