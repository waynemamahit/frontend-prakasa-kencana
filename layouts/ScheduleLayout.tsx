import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row, Select, Space } from 'antd';
import React from 'react';
import { colProps } from './BasePageLayout';

export default function ScheduleLayout({
  header = null,
  children,
}: {
  header?: React.ReactNode | null;
  children: React.ReactNode;
}) {
  const schedules = [
    '7:30am - 3.25pm',
    '7:00am - 3.25pm',
    '6:45am - 3.25pm',
    '6:00am - 3.25pm',
    '7:30am - 12.15pm',
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col {...colProps} lg={5} xl={5}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Select
              showSearch
              placeholder="Select Department"
              optionFilterProp="children"
              style={{
                width: '100%',
              }}
              filterOption={(input: any, option: any) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: 'general',
                  label: 'General',
                },
                {
                  value: 'marketing',
                  label: 'Marketing',
                },
                {
                  value: 'finance',
                  label: 'Finance',
                },
                {
                  value: 'technology',
                  label: 'Technology',
                },
                {
                  value: 'engineering',
                  label: 'Engineering',
                },
                {
                  value: 'operations',
                  label: 'Operations',
                },
              ]}
            />
          </Col>
          <Col span={24}>
            <Space.Compact style={{ width: '100%' }}>
              <Input placeholder="Add Schedule" />
              <Button icon={<PlusOutlined />}></Button>
            </Space.Compact>
          </Col>
          <Col span={24}>
            <Row gutter={[8, 8]} style={{ height: '55vh', overflow: 'auto' }}>
              {schedules.map((schedule) => (
                <Col key={schedule} span={24}>
                  <Card>
                    <Row justify="space-around" align="middle" gutter={[8, 8]}>
                      <Col
                        span={16}
                        style={{ fontWeight: 'bold', fontSize: 12 }}
                      >
                        {schedule}
                      </Col>
                      <Col span={8}>
                        <Space align="end">
                          <Button size="small" icon={<EditOutlined />} />
                          <Button size="small" icon={<DeleteOutlined />} />
                        </Space>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
      <Col {...colProps} lg={19} xl={19}>
        <Row justify="end" gutter={[16, 16]}>
          <Col {...colProps} lg={9} xl={7}>
            {header}
          </Col>
        </Row>
        <Row style={{ paddingTop: 12, overflow: 'auto' }}>
          <Col span={24}>{children}</Col>
        </Row>
      </Col>
    </Row>
  );
}
