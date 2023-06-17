import { Employee } from './Employee';

export interface ScheduleEmployee extends Employee {
  schedules: Schedule[];
}

export interface Schedule {
  startDate: string;
  endDate: string;
}
