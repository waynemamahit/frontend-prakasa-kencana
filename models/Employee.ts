export interface Employee {
  key: React.Key;
  name: string;
}

export interface EmployeeLeave extends Employee {
  type: number;
  totalDay: number;
}
