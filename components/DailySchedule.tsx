import ScheduleLayout from '@/layouts/ScheduleLayout';
import { baseFormatDate } from '@/utils/date';
import { Col, DatePicker, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import ScheduleTable from './ScheduleTable';

export default function DailySchedule() {
  const dailyDate = dayjs('9 Mar 2023', baseFormatDate);
  const columns: ColumnsType<{}> = [];

  return (
    <ScheduleLayout
      header={
        <Row justify="end">
          <Col span={14}>
            <DatePicker format={baseFormatDate} value={dailyDate} />
          </Col>
        </Row>
      }
    >
      <ScheduleTable dataColumn={columns} dataSource={[]} />
    </ScheduleLayout>
  );
}
