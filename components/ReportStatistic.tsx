import { colProps } from '@/layouts/BasePageLayout';
import columnTheme from '@amcharts/amcharts5/themes/Frozen';
import stackedTheme from '@amcharts/amcharts5/themes/Dataviz';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import ColumnChart from './ColumnChart';
import GrowStatistic, { GrowStatisticProps } from './GrowStatistic';
import StackedBarChart from './StackedBarChart';

export type ReportStatisticProps = {
  rootChartColumn: string;
  dataColumnChart: any[];
  rootStackedBar: string;
  dataStackedChart: any[];
} & GrowStatisticProps;

export default function ReportStatistic({
  value,
  growValue,
  growTitle,
  growValueStyle = { color: '#3f8600' },
  prefix = <ArrowUpOutlined />,
  rootChartColumn,
  dataColumnChart,
  rootStackedBar,
  dataStackedChart,
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
          data={dataColumnChart}
          height={240}
        />
      </Col>
      <Col span={24}>
        <Card>
          <StackedBarChart
            rootLabel={rootStackedBar}
            data={dataStackedChart}
            theme={stackedTheme}
            height={140}
          />
        </Card>
      </Col>
    </Row>
  );
}
