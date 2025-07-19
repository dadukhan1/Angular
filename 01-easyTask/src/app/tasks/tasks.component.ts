import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { type AddTaskData } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) taskName!: string;
  isAddingTask = false;

  constructor(private tasksService: TasksService) {}

  get userTask() {
    return this.tasksService.getUserTask(this.userId);
  }
  onAddTask() {
    this.isAddingTask = true;
  }
  onCancelTask() {
    this.isAddingTask = false;
  }
}
