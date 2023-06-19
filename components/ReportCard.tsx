import { colProps } from '@/layouts/BasePageLayout';
import { FileDoneOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import React from 'react';
import { GrowStatisticProps } from './GrowStatistic';
import ReportStatistic from './ReportStatistic';

type ReportCardProps = {
  title: string;
  rootChart: string;
  dataColumnChart: any[];
  dataStackedChart: any[];
  children: React.ReactNode;
} & GrowStatisticProps;

export default function ReportCard({
  value,
  growTitle,
  growValue,
  dataColumnChart,
  dataStackedChart,
  rootChart,
  title,
  children,
}: ReportCardProps) {
  return (
    <Card>
      <h3 style={{ color: '#454545' }}>
        <FileDoneOutlined style={{ margin: 'auto 6px' }} />
        {title} Report
      </h3>
      <Row gutter={[16, 16]}>
        <Col {...colProps} lg={12} xl={12}>
          <ReportStatistic
            value={value}
            growTitle={growTitle}
            growValue={growValue}
            rootChartColumn={rootChart + 'report'}
            dataColumnChart={dataColumnChart}
            rootStackedBar={'top' + rootChart}
            dataStackedChart={dataStackedChart}
          />
        </Col>
        <Col
          {...colProps}
          lg={12}
          xl={12}
          style={{ borderLeft: '6px solid #E6E6E6', paddingLeft: 25 }}
        >
          {children}
          <div style={{ textAlign: 'right' }}>
            <Button type="link">Go to {title.toLowerCase()}</Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
