import { colProps } from '@/layouts/BasePageLayout';
import columnTheme from '@amcharts/amcharts5/themes/Frozen';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import ColumnChart from './ColumnChart';
import GrowStatistic, { GrowStatisticProps } from './GrowStatistic';

export type ReportStatisticProps = {
  rootChartColumn: string;
  dataColumn: unknown[];
} & GrowStatisticProps;

export default function ReportStatistic({
  value,
  growValue,
  growTitle,
  growValueStyle = { color: '#3f8600' },
  prefix = <ArrowUpOutlined />,
  rootChartColumn,
  dataColumn,
}: ReportStatisticProps) {
  return (
    <Row align={'middle'} gutter={[8, 8]}>
      <Col {...colProps} lg={8} xl={8}>
        <GrowStatistic
          value={value}
          growTitle={growTitle}
          growValue={growValue}
          growValueStyle={growValueStyle}
          prefix={prefix}
        />
      </Col>
      <Col {...colProps} lg={16} xl={16}>
        <ColumnChart
          rootLabel={rootChartColumn}
          theme={columnTheme}
          data={dataColumn}
          height={240}
        />
      </Col>
      <Col span={24}>
        <Card></Card>
      </Col>
    </Row>
  );
}
