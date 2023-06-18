import { colProps } from '@/layouts/BasePageLayout';
import { FileDoneOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import React from 'react';
import ReportStatistic, { ReportStatisticProps } from './ReportStatistic';

type ReportCardProps = {
  title: string;
  dataColumn: unknown[];
  children: React.ReactNode;
} & ReportStatisticProps;

export default function ReportCard({
  value,
  growTitle,
  growValue,
  dataColumn,
  rootChartColumn,
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
            rootChartColumn={rootChartColumn + 'report'}
            dataColumn={dataColumn}
          />
        </Col>
        <Col
          {...colProps}
          lg={12}
          xl={12}
          style={{ borderLeft: '6px solid #E6E6E6' }}
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
