import { Component, input, signal } from '@angular/core';
import { TaskComponent } from './task/task';
import { NewTaskComponent } from './new-task/new-task';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class TasksComponent {
  name = input<string | undefined>();
  userId = input.required<string>();

  isAddingTask = signal(false);

  constructor(private tasksService: TasksService) {}

  getSelectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId());
  }

  onCompleteTask(taskId: string) {
    this.tasksService.removeTask(taskId);
  }

  onClickAddTask() {
    this.isAddingTask.set(true);
  }

  onCloseAddTask() {
    this.isAddingTask.set(false);
  }
}
