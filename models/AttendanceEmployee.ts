import { Employee } from './Employee';

export interface AttendanceEmployee extends Employee {
  checkin_time: string;
  checkin_location: string;
  checkout_time: string;
  checkout_location: string;
  status: number;
  detail: string;
}
