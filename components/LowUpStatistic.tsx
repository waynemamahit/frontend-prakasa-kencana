import { Card, Statistic, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

export interface LowUpStatisticProps {
  title: string;
  value: number;
  growTitle?: string;
  growValue: number;
  precision?: number;
  growValueStyle?: object;
  prefix?: React.ReactNode;
  suffix?: string;
}
export default function LowUpStatistic({
  title,
  value,
  growTitle,
  growValue,
  precision,
  growValueStyle,
  prefix,
  suffix,
}: LowUpStatisticProps) {
  return (
    <Card style={{ padding: '0' }}>
      <Title level={5}>{title}</Title>
      <Title level={2}>{value.toLocaleString('en')}</Title>
      <Statistic
        title={growTitle}
        value={growValue}
        precision={precision}
        valueStyle={growValueStyle}
        prefix={prefix}
        suffix={suffix}
      />
    </Card>
  );
}
