'use client';
import DonutChart from '@/components/DonutChart';
import GrowStatistic, { GrowStatisticProps } from '@/components/GrowStatistic';
import ReportCard from '@/components/ReportCard';
import BasePageLayout, { colProps } from '@/layouts/BasePageLayout';
import { EmployeeLeave } from '@/models/Employee';
import { baseFormatDate } from '@/utils/date';
import statusChartTheme from '@amcharts/amcharts5/themes/Dataviz';
import genderChartTheme from '@amcharts/amcharts5/themes/Kelly';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Card,
  Col,
  DatePicker,
  Row,
  Table,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import ReportNumberStatistic, {
  ReportNumberStatisticData,
} from '../components/ReportNumberStatistic';

const { Title } = Typography;

const formatDate = 'ddd, ' + baseFormatDate;

export default function Home() {
  const cardTitleStyle = { color: '#454545' };
  const growReport: GrowStatisticProps = {
    value: 2420,
    growValue: 440,
    growTitle: 'vs yesterday',
  };

  const attedanceNumStat: ReportNumberStatisticData[] = [
    {
      label: 'All Users Statistics',
      value: '25,256 Users',
    },
    {
      label: 'Average Visit Time',
      value: '2 Hours 35 Minutes',
    },
  ];

  const dataDays = [
    {
      country: 'Mon',
      value: 1000,
    },
    {
      country: 'Tue',
      value: 2000,
    },
    {
      country: 'Wed',
      value: 1500,
    },
    {
      country: 'Thu',
      value: 500,
    },
    {
      country: 'Fri',
      value: 2500,
    },
    {
      country: 'Sat',
      value: 2000,
    },
    {
      country: 'Sunday',
      value: 2500,
    },
  ];

  const columns: ColumnsType<EmployeeLeave> = [
    {
      title: 'Employee Name',
      dataIndex: 'name',
      render: (value: any) => (
        <>
          <Avatar icon={<UserOutlined />} style={{ marginRight: 10 }} />
          {value}
        </>
      ),
    },
    {
      title: 'Type of Leave',
      dataIndex: 'type',
      render: (value: number) => {
        const typesLeave = [
          {
            color: 'purple',
            label: 'Medical leave',
          },
        ];
        const typeRow = typesLeave[value];
        return (
          <Badge size="default" color={typeRow.color} text={typeRow.label} />
        );
      },
    },
    {
      title: 'Total Days',
      dataIndex: 'totalDay',
      render: (value: any) => value + ' Days',
    },
  ];

  const employees: EmployeeLeave[] = [
    {
      name: 'Olivia Rhye',
    },
    {
      name: 'Tony',
    },
    {
      name: 'Jony',
    },
    {
      name: 'Budi',
    },
    {
      name: 'Yudi',
    },
  ].map((leaveItem, index) => ({
    ...leaveItem,
    key: index,
    type: 0,
    totalDay: 20,
  }));

  return (
    <BasePageLayout
      title="Welcome, John"
      subtitle="You're Working at Prakasa Makmur Kencana"
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Card>
            <Title style={cardTitleStyle} level={3}>
              Company Overview
            </Title>
            <Row justify={'space-around'} gutter={[16, 16]}>
              <Col {...colProps} lg={6} xl={6}>
                <Row gutter={[8, 8]}>
                  <Col span={24}>
                    <Card>
                      <GrowStatistic
                        title={'Total Employee'}
                        value={2420}
                        growTitle={'vs yesterday'}
                        growValue={425}
                        growValueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card>
                      <GrowStatistic
                        title={'Total Deparment'}
                        value={100}
                        growTitle={'vs yesterday'}
                        growValue={52}
                        growValueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                      />
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col {...colProps} lg={18} xl={18}>
                <Card>
                  <Title level={5}>Diversity</Title>
                  <Row justify={'space-around'} gutter={[16, 16]}>
                    <Col {...colProps} lg={24} xl={12}>
                      <Card>
                        <DonutChart
                          rootLabel="gender"
                          label="Gender"
                          data={[
                            {
                              category: 'Male',
                              value: 40,
                            },
                            {
                              category: 'Female',
                              value: 60,
                            },
                          ]}
                          theme={genderChartTheme}
                          height={268}
                        />
                      </Card>
                    </Col>
                    <Col {...colProps} lg={24} xl={12}>
                      <Card>
                        <DonutChart
                          rootLabel="status"
                          label="Status"
                          data={[
                            {
                              category: 'Married',
                              value: 40,
                            },
                            {
                              category: 'Not Married',
                              value: 60,
                            },
                          ]}
                          theme={statusChartTheme}
                          height={268}
                        />
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <ReportCard
            title="Attendance"
            rootChartColumn="attendance"
            dataColumn={dataDays}
            {...growReport}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <ReportNumberStatistic data={attedanceNumStat} />
              </Col>
              <Col span={24}></Col>
            </Row>
          </ReportCard>
        </Col>
        <Col span={24}>
          <ReportCard
            title="Leave"
            rootChartColumn="leave"
            dataColumn={dataDays}
            {...growReport}
          >
            <Row justify={'center'} gutter={[16, 16]}>
              <Col span={8}>
                <DatePicker
                  format={formatDate}
                  value={dayjs('Tue, 16 Aug 2021', formatDate)}
                />
              </Col>
              <Col span={24}>
                <Table
                  bordered
                  columns={columns}
                  dataSource={employees}
                  pagination={{ pageSize: 5 }}
                  scroll={{ y: 240 }}
                />
              </Col>
            </Row>
          </ReportCard>
        </Col>
      </Row>
    </BasePageLayout>
  );
}
