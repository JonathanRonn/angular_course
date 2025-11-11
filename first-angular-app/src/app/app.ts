import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user';
import { TasksComponent } from './tasks/tasks';
import { DUMMY_USERS } from './dummyusers';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('first-angular-app');
  users = DUMMY_USERS;
  // selectedUserId = 'u1'; // default value
  selectedUserId?: string;

  onSelectUser(id: string) {
    this.selectedUserId = id;
  }

  get selectedUserName() {
    return this.users.find((user) => user.id === this.selectedUserId)?.name ?? '';
  }
}
