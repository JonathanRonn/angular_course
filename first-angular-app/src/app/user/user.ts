import { Component, computed, input, output } from '@angular/core';
import { type User } from './user.model';
import { CardComponent } from '../../shared/card/card';

@Component({
  selector: 'app-user',
  imports: [CardComponent],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserComponent {
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;
  // @Output() select = new EventEmitter();

  // id = input.required<string>();
  // avatar = input.required<string>();
  // name = input.required<string>();

  user = input.required<User>();

  select = output<string>();
  selected = input.required<boolean>();

  imagePath = computed(() => 'users/' + this.user().avatar);

  onSelectUser() {
    this.select.emit(this.user().id);
  }
}
