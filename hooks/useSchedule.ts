import { ScheduleEmployee } from '@/models/Schedule';

export default function useSchedule() {
  const data: ScheduleEmployee[] = [];
  for (let index = 1; index <= 5; index++) {
    data.push({
      key: index,
      name: 'Tony',
      schedules: [],
    });
  }
  
  return {
    data,
    // TODO: Remove this dummy after add logic and state
    dataSource: data.map((dataItem: ScheduleEmployee, index: number) => ({
      ...dataItem,
      monday: index === 0 ? '7am-3pm' : '+',
      tuesday: '+',
      wednesday: '+',
      thursday: '+',
      friday: '+',
      saturday: '+',
      sunday: '+',
    })),
  };
}
