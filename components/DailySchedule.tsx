import useSchedule from '@/hooks/useSchedule';
import ScheduleLayout from '@/layouts/ScheduleLayout';
import { baseFormatDate } from '@/utils/date';
import { Col, DatePicker, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import ScheduleTable from './ScheduleTable';

const loopCountHours = (
  lastProcess: (hours: number, ampm: string, hourCount: Date) => void
) => {
  let hourCount = new Date('Jan 01 1997 06:00:00');
  const infCond = true;
  while (infCond) {
    let hours = hourCount.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    lastProcess(hours, ampm, hourCount);
    if (hourCount.getHours() === 23) break;
    hourCount = new Date(hourCount.getTime() + 1000 * 60 * 60);
  }
};

export default function DailySchedule() {
  const { data } = useSchedule();
  const dailyDate = dayjs('9 Mar 2023', baseFormatDate);

  const columns: ColumnsType<any> = [];
  let endHour: Date | null = null;
  loopCountHours((hours: number, ampm: string, hourCount: Date) => {
    columns.push({
      title: hours + ampm,
      dataIndex: ampm + hours,
      align: 'center',
      onCell: (_: any, index: number | undefined) => {
        let colSpan = 1;
        const am7Cond = index === 0 || index === 1;
        const am6Cond = index === 2 || index === 3;
        if (am7Cond && hours + ampm === '7am') {
          colSpan = 9;
          endHour = new Date(
            hourCount.getTime() + 1000 * 60 * 60 * (colSpan - 1)
          );
        }
        if (am6Cond && hours + ampm === '6am') {
          colSpan = 10;
          endHour = new Date(
            hourCount.getTime() + 1000 * 60 * 60 * (colSpan - 1)
          );
        }
        if (endHour) {
          const am7MergedCond =
            am7Cond &&
            hourCount.getHours() > 7 &&
            hourCount.getHours() <= endHour.getHours();
          const am6MergedCond =
            am6Cond &&
            hourCount.getHours() > 6 &&
            hourCount.getHours() <= endHour.getHours();
          if (am7MergedCond || am6MergedCond) {
            colSpan = 0;
          }
        }
        return {
          colSpan,
        };
      },
      render: (value: any, _: any, index: number) =>
        ([0, 1].includes(index) && ampm + hours === 'am7') ||
        ([2, 3].includes(index) && ampm + hours === 'am6') ? (
          <span style={{ fontWeight: 'bold' }}>{value}</span>
        ) : (
          value
        ),
    });
  });

  const dataSource: any = [];
  let dataIndex = 0;
  for (const dataItem of data) {
    const newItem: any = {};
    loopCountHours((hours: number, ampm: string) => {
      if ([0, 1].includes(dataIndex) && ampm + hours === 'am7') {
        newItem[ampm + hours] = '7am - 3pm';
      } else if ([2, 3].includes(dataIndex) && ampm + hours === 'am6') {
        newItem[ampm + hours] = '6am - 3pm';
      } else newItem[ampm + hours] = '+';
    });
    dataSource.push({
      ...dataItem,
      ...newItem,
    });
    dataIndex++;
  }

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
      <ScheduleTable dataColumn={columns} dataSource={dataSource} />
    </ScheduleLayout>
  );
}
