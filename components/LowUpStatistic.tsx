import { Statistic } from 'antd';
import React from 'react';

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
    <>
      <h5 style={{ fontSize: 14, margin: '6px 0' }}>{title}</h5>
      <h3 style={{ fontSize: 30, margin: '10px 0' }}>
        {value.toLocaleString('en')}
      </h3>
      <Statistic
        title={growTitle}
        value={growValue}
        precision={precision}
        valueStyle={growValueStyle}
        prefix={prefix}
        suffix={suffix}
      />
    </>
  );
}
