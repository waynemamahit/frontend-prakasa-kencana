import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Calendar, Col, List, Row, Select } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import type { CellRenderInfo } from 'rc-picker/lib/interface';

dayjs.extend(dayLocaleData);

export const HeaderRender = ({
  value,
  onChange,
}: {
  value: Dayjs;
  onChange: (date: Dayjs) => void;
}) => {
  const start = 0,
    end = 12,
    monthOptions = [],
    months = [],
    localeData = value.localeData();

  let current = value.clone();
  for (let i = 0; i < 12; i++) {
    current = current.month(i);
    months.push(localeData.monthsShort(current));
  }

  for (let i = start; i < end; i++) {
    monthOptions.push(
      <Select.Option key={i} value={i} className="month-item">
        {months[i]}
      </Select.Option>
    );
  }

  const year = value.year();
  const month = value.month();
  const yearOptions: any = [];
  for (let i = year - 10; i < year + 10; i += 1) {
    yearOptions.push(
      <Select.Option key={i} value={i} className="year-item">
        {i}
      </Select.Option>
    );
  }

  return (
    <div>
      <Row justify={'space-between'} style={{ width: '100%' }} gutter={0}>
        <Col
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
          style={{ margin: '10px 2px' }}
        >
          <Select
            style={{ margin: 'auto 5px' }}
            size="small"
            popupMatchSelectWidth={false}
            value={year}
            onChange={(newYear) => {
              const now = value.clone().year(newYear);
              onChange(now);
            }}
          >
            {yearOptions}
          </Select>
          <Select
            style={{ margin: 'auto 5px' }}
            size="small"
            popupMatchSelectWidth={false}
            value={month}
            onChange={(newMonth) => {
              const now = value.clone().month(newMonth);
              onChange(now);
            }}
          >
            {monthOptions}
          </Select>
        </Col>
        <Col xs={12} sm={12} md={5} lg={5} xl={5}>
          <Row justify="end">
            <Col>
              <Button type="primary" style={{ margin: '10px 8px' }}>
                Set Schedule
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const getListEvent = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          icon: <UserOutlined />,
          title: 'Employee Working',
          description: '5',
        },
        {
          icon: <ClockCircleOutlined />,
          title: 'Working Hours',
          description: '14 Hours 30 Minutes',
        },
      ];
      break;
    case 23:
      listData = [
        {
          icon: <UserOutlined />,
          title: 'Employee Working',
          description: '5',
        },
        {
          icon: <ClockCircleOutlined />,
          title: 'Working Hours',
          description: '10 Hours 5 Minutes',
        },
      ];
      break;
    default:
  }
  return listData || [];
};

export default function MonthlySchedule() {
  const dateCellRender = (value: Dayjs) => {
    const eventData = getListEvent(value);
    return (
      eventData.length > 0 && (
        <List
          itemLayout="horizontal"
          dataSource={eventData}
          locale={{ emptyText: '' }}
          renderItem={(item, index) => (
            <List.Item key={item.title + index}>
              <List.Item.Meta
                avatar={item.icon}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      )
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} headerRender={HeaderRender} />;
}
