import { InjectionToken } from '@angular/core';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

type TaskStatusOptions = {
  value: string;
  status: string;
  text: string;
}[];

export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions>(
  'task-status-option'
);

export const TaskStatusOptions: TaskStatusOptions = [
  {
    value: 'open',
    status: 'OPEN',
    text: 'Open',
  },
  {
    value: 'in-progress',
    status: 'IN_PROGRESS',
    text: 'In-Progress',
  },
  {
    value: 'done',
    status: 'DONE',
    text: 'Done',
  },
];

export const TaskStatusOptionsProvider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: TaskStatusOptions,
}; 

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
