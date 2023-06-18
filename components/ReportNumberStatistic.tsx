import { colProps } from '@/layouts/BasePageLayout';
import { Col, Row, Space, Typography } from 'antd';

const { Title } = Typography;

export interface ReportNumberStatisticData {
  label: string;
  value: string;
}

export default function ReportNumberStatistic({
  data,
}: {
  data: ReportNumberStatisticData[];
}) {
  const labelStyle = { color: '#A7A7A7' };
  return (
    <Row gutter={[8, 8]}>
      {data.map(({ value, label }: ReportNumberStatisticData) => (
        <Col key={label} {...colProps} lg={12} xl={12}>
          <Title level={4} style={labelStyle}>
            {label}
          </Title>
          <Space>
            {value.split(' ').map((valueItem, index) => {
              const condItem = (index + 1) % 2 !== 0;
              return (
                <Title
                  key={valueItem}
                  level={condItem ? 2 : 4}
                  style={condItem ? {} : labelStyle}
                >
                  {valueItem}
                </Title>
              );
            })}
          </Space>
        </Col>
      ))}
    </Row>
  );
}
