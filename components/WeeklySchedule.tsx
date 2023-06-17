import useSchedule from '@/hooks/useSchedule';
import ScheduleLayout from '@/layouts/ScheduleLayout';
import { baseFormatDate } from '@/utils/date';
import { Col, DatePicker, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import ScheduleTable from './ScheduleTable';

export const weeklyColumns: ColumnsType<any> = [
  {
    title: 'Mon 1',
    dataIndex: 'monday',
    align: 'center',
  },
  {
    title: 'Tue 2',
    dataIndex: 'tuesday',
    align: 'center',
  },
  {
    title: 'Wed 3',
    dataIndex: 'wednesday',
    align: 'center',
  },
  {
    title: 'Thu 4',
    dataIndex: 'thursday',
    align: 'center',
  },
  {
    title: 'Fri 5',
    dataIndex: 'friday',
    align: 'center',
  },
  {
    title: 'Sat 6',
    dataIndex: 'saturday',
    align: 'center',
  },
  {
    title: 'Sun 7',
    dataIndex: 'sunday',
    align: 'center',
  },
];

export default function WeeklySchedule() {
  const { dataSource } = useSchedule();

  return (
    <ScheduleLayout
      header={
        <Row justify="end">
          <Col span={14}>
            <DatePicker
              value={dayjs('6 Mar 2023', baseFormatDate)}
              format={baseFormatDate}
              picker="week"
            />
          </Col>
        </Row>
      }
    >
      <ScheduleTable dataColumn={weeklyColumns} dataSource={dataSource} />
    </ScheduleLayout>
  );
}
