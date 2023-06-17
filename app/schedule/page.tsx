'use client';
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import MonthlySchedule from '@/components/MonthlySchedule';
import BiweeklySchedule from '@/components/BiweeklySchedule';
import WeeklySchedule from '@/components/WeeklySchedule';
import DailySchedule from '@/components/DailySchedule';

const items: TabsProps['items'] = [
  {
    label: `Monthly`,
    children: <MonthlySchedule />,
  },
  {
    label: `Biweekly`,
    children: <BiweeklySchedule />,
  },
  {
    label: `Weekly`,
    children: <WeeklySchedule />,
  },
  {
    label: `Daily`,
    children: <DailySchedule />,
  },
].map((item, index) => ({
  key: item.label + index,
  ...item,
}));

export default function Schedule() {
  return <Tabs defaultActiveKey="1" items={items} />;
}
