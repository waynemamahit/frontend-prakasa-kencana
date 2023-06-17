'use client';
import LowUpStatistic, {
  LowUpStatisticProps,
} from '@/components/LowUpStatistic';
import BasePageLayout, { colProps } from '@/layouts/BasePageLayout';
import { AttendanceEmployee } from '@/models/AttendanceEmployee';
import { baseFormatDate } from '@/utils/date';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DownOutlined,
  EnvironmentFilled,
  FilterFilled,
  UpOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ExpandableConfig } from 'antd/es/table/interface';
import dayjs from 'dayjs';

const expandeable: ExpandableConfig<AttendanceEmployee> | undefined = {
  expandIcon: ({ expanded, onExpand, record }) =>
    expanded ? (
      <UpOutlined color="primary" onClick={(e) => onExpand(record, e)} />
    ) : (
      <DownOutlined color="primary" onClick={(e) => onExpand(record, e)} />
    ),
  expandedRowRender: (record: AttendanceEmployee) => (
    <p style={{ margin: 0 }}>{record.detail}</p>
  ),
  rowExpandable: (record: AttendanceEmployee) =>
    typeof record.detail !== 'undefined',
};

const formatDate = 'ddd, ' + baseFormatDate;

const attendanceStats: LowUpStatisticProps[] = [
  {
    title: 'Present Employees',
    value: 2420,
    growTitle: 'vs yesterday',
    growValue: 450,
    growValueStyle: { color: '#3f8600' },
    prefix: <ArrowUpOutlined />,
  },
  {
    title: 'Late Employees',
    value: 1210,
    growTitle: 'vs yesterday',
    growValue: 200,
    growValueStyle: { color: '#cf1322' },
    prefix: <ArrowDownOutlined />,
  },
  {
    title: 'Employees on Leaves',
    value: 316,
    growTitle: 'vs yesterday',
    growValue: 10,
    growValueStyle: { color: '#3f8600' },
    prefix: <ArrowUpOutlined />,
  },
];

const renderLocationColumn = (field: string) => {
  const render = (_: any, row: any) => {
    return row[field].includes('https://') ? (
      <Button
        color="primary"
        target="__blank"
        icon={<EnvironmentFilled />}
        href={row[field]}
      >
        View map
      </Button>
    ) : (
      row[field]
    );
  };
  return render;
};

const columns: ColumnsType<AttendanceEmployee> = [
  {
    title: 'Employee Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Check-In',
    children: [
      {
        title: 'Time',
        dataIndex: 'checkin_time',
      },
      {
        title: 'Location',
        dataIndex: 'checkin_location',
        render: renderLocationColumn('checkin_location'),
      },
    ],
  },
  {
    title: 'Check-Out',
    children: [
      {
        title: 'Time',
        dataIndex: 'checkout_time',
      },
      {
        title: 'Location',
        dataIndex: 'checkout_location',
        render: renderLocationColumn('checkout_location'),
      },
    ],
  },
  {
    title: 'Status',
    sorter: (a, b) => a.status - b.status,
    render: (_, record: AttendanceEmployee) => {
      const statusRef = [
        {
          style: {
            color: '#013220',
            backgroundColor: '#A7FFA7',
          },
          text: 'Early Checkin',
        },
        {
          style: {
            color: '#4169E1',
            backgroundColor: '#CFECF5',
          },
          text: 'On Time',
        },
        {
          style: {
            color: '#8B0000',
            backgroundColor: '#FFE2E2',
          },
          text: 'Absent',
        },
        {
          style: {
            color: '#5151EB',
            backgroundColor: '#E6E6FA',
          },
          text: 'Late Checkin',
        },
        {
          style: {
            color: '#626200',
            backgroundColor: '#FFFFBA',
          },
          text: 'Early Checkout',
        },
        {
          style: {
            color: '#CE7100',
            backgroundColor: '#FFE5C4',
          },
          text: 'Late Checkout',
        },
      ];
      return (
        <div
          style={{
            width: '100%',
            fontSize: '12px',
            textAlign: 'center',
            padding: '4px 6px',
            fontWeight: 'bold',
            borderRadius: '6px',
            ...statusRef[record.status].style,
          }}
        >
          {statusRef[record.status].text}
        </div>
      );
    },
  },
  {
    title: 'Action',
    render: () => <div>Details</div>,
  },
  Table.EXPAND_COLUMN,
];

export default function Attendance() {
  const data: AttendanceEmployee[] = [];
  for (let index = 0; index <= 4; index++) {
    data.push({
      key: index,
      name: 'Tony',
      checkin_time: '09:00',
      checkin_location: 'Singapore',
      checkout_time: '09:00',
      checkout_location: 'Singapore',
      status: index,
      detail:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae eos quos quis.',
    });
  }
  data.push({
    key: 5,
    name: 'Tony',
    checkin_time: '09:00',
    checkin_location: 'https://goo.gl/maps/UcLcqTq7cZMQiAKm8',
    checkout_time: '09:00',
    checkout_location: 'https://goo.gl/maps/UcLcqTq7cZMQiAKm8',
    status: 5,
    detail:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae eos quos quis.',
  });

  return (
    <BasePageLayout
      title="Welcome back, John"
      subtitle="You're Working at ABC Company"
      more={
        <Col {...colProps} lg={2} xl={2}>
          <Button icon={<UploadOutlined />}>Export</Button>
        </Col>
      }
    >
      <Row justify={'space-around'} gutter={[8, 8]}>
        {attendanceStats.map((item: LowUpStatisticProps) => (
          <Col key={item.title} {...colProps} lg={8} xl={8}>
            <LowUpStatistic {...item} />
          </Col>
        ))}
        <Col {...colProps} lg={24} xl={24}>
          <Card>
            <Row justify={'space-between'} gutter={[8, 8]}>
              <Col {...colProps} lg={4} xl={4}></Col>
              <Col {...colProps} lg={4} xl={4}>
                <DatePicker
                  format={formatDate}
                  value={dayjs('Mon, 16 Aug 2021', formatDate)}
                />
              </Col>
              <Col {...colProps} lg={4} xl={4}>
                <Button icon={<FilterFilled />}>More filters</Button>
              </Col>
              <Col {...colProps} lg={24} xl={24}>
                <Table
                  columns={columns}
                  dataSource={data}
                  expandable={expandeable}
                  pagination={{ pageSize: 10 }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </BasePageLayout>
  );
}
