import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';


@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
})
export class NewTaskComponent {
  close = output<void>();
  enteredTitle = signal<string>('');
  enteredSummary = signal<string>('');
  enteredDueDate = signal<string>('');
  userId = input.required<string>();

  private taskService = inject(TasksService);

  onCancelAddTask() {
    this.close.emit();
  }

  onSubmit() {
    this.taskService.addTask(
      this.userId(),
      {
      title: this.enteredTitle(),
        summary: this.enteredSummary(),
        dueDate: this.enteredDueDate(),
      }
    );
    this.close.emit();
  }
}
