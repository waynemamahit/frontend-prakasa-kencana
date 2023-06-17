import useSchedule from '@/hooks/useSchedule';
import ScheduleLayout from '@/layouts/ScheduleLayout';
import { baseFormatDate } from '@/utils/date';
import { DatePicker } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import ScheduleTable from './ScheduleTable';
import { weeklyColumns } from './WeeklySchedule';

const columns: ColumnsType<any> = [...weeklyColumns, ...weeklyColumns];

export default function BiweeklySchedule() {
  const { dataSource } = useSchedule();

  return (
    <ScheduleLayout
      header={
        <DatePicker.RangePicker
          value={[
            dayjs('6 Mar 2023', baseFormatDate),
            dayjs('19 Mar 2023', baseFormatDate),
          ]}
          format={baseFormatDate}
          picker="week"
        />
      }
    >
      <ScheduleTable dataColumn={columns} dataSource={dataSource} />
    </ScheduleLayout>
  );
}
