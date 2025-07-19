import { NgModule } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TasksComponent } from './tasks.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TasksComponent, AddTaskComponent, TaskComponent],
  exports: [TasksComponent],
  imports: [FormsModule, SharedModule, CommonModule],
})
export class TasksModule {}
