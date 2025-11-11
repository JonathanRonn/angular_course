import { Component, input, output } from '@angular/core';
import { type Task } from './task.model';
import { CardComponent } from "../../../shared/card/card";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [CardComponent, DatePipe],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class TaskComponent {
  task = input.required<Task>();
  complete = output<string>();

  onCompleteTask() {
    this.complete.emit(this.task().id);
  }
}
