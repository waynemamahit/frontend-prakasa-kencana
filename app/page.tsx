'use client';
import LowUpStatistic from '@/components/LowUpStatistic';
import PieChart from '@/components/PieChart';
import BasePageLayout, { colProps } from '@/layouts/BasePageLayout';
import statusChartTheme from '@amcharts/amcharts5/themes/Dataviz';
import genderChartTheme from '@amcharts/amcharts5/themes/Kelly';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Typography } from 'antd';

const { Title } = Typography;

export default function Home() {
  return (
    <BasePageLayout
      title="Welcome, John"
      subtitle="You're Working at Prakasa Makmur Kencana"
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Card>
            <Title level={3}>Company Overview</Title>
            <Row justify={'space-around'} gutter={[16, 16]}>
              <Col {...colProps} lg={6} xl={6}>
                <Row gutter={[8, 8]}>
                  <Col span={24}>
                    <Card>
                      <LowUpStatistic
                        title={'Total Employee'}
                        value={2420}
                        growTitle={'vs yesterday'}
                        growValue={225}
                        growValueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card>
                      <LowUpStatistic
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
                        <PieChart
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
                        <PieChart
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
      </Row>
    </BasePageLayout>
  );
}
