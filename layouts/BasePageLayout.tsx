import { Col, Row, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

export const colProps = {
  xs: 24,
  sm: 24,
  md: 24,
};

export default function BasePageLayout({
  title = '',
  subtitle = '',
  children,
  more = null,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  more?: React.ReactNode | null;
}) {
  return (
    <main>
      <Row
        justify={'space-between'}
        gutter={[0, 0]}
        align={'middle'}
        style={{
          marginBottom: '24px',
        }}
      >
        <Col {...colProps} lg={12} xl={12}>
          <Title level={3}>{title}</Title>
          <Text type="secondary">{subtitle}</Text>
        </Col>
        {more}
      </Row>
      {children}
    </main>
  );
}
