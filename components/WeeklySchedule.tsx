import useSchedule from '@/hooks/useSchedule';
import ScheduleLayout from '@/layouts/ScheduleLayout';
import { baseFormatDate } from '@/utils/date';
import { DatePicker } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import ScheduleTable from './ScheduleTable';

const renderWeek = (value: any) =>
  value !== '+' ? <span style={{ fontWeight: 'bold' }}>{value}</span> : value;

export const weeklyColumns: ColumnsType<any> = [
  {
    title: 'Mon 1',
    dataIndex: 'monday',
    align: 'center',
    render: renderWeek,
  },
  {
    title: 'Tue 2',
    dataIndex: 'tuesday',
    align: 'center',
    render: renderWeek,
  },
  {
    title: 'Wed 3',
    dataIndex: 'wednesday',
    align: 'center',
    render: renderWeek,
  },
  {
    title: 'Thu 4',
    dataIndex: 'thursday',
    align: 'center',
    render: renderWeek,
  },
  {
    title: 'Fri 5',
    dataIndex: 'friday',
    align: 'center',
    render: renderWeek,
  },
  {
    title: 'Sat 6',
    dataIndex: 'saturday',
    align: 'center',
    render: renderWeek,
  },
  {
    title: 'Sun 7',
    dataIndex: 'sunday',
    align: 'center',
    render: renderWeek,
  },
];

export default function WeeklySchedule() {
  const { dataSource } = useSchedule();

  return (
    <ScheduleLayout
      header={
        <DatePicker.RangePicker
          value={[
            dayjs('6 Mar 2023', baseFormatDate),
            dayjs('12 Mar 2023', baseFormatDate),
          ]}
          format={baseFormatDate}
        />
      }
    >
      <ScheduleTable dataColumn={weeklyColumns} dataSource={dataSource} />
    </ScheduleLayout>
  );
}
