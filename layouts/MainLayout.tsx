'use client';
import {
  BellOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
  HomeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Col, Input, Layout, Menu, Row, theme } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { createElement, useMemo, useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
  {
    key: '',
    icon: createElement(HomeOutlined),
    label: `Home`,
  },
  {
    key: 'attendance',
    icon: createElement(FileDoneOutlined),
    label: `Attendance`,
  },
  {
    key: 'schedule',
    icon: createElement(ClockCircleOutlined),
    label: `Schedule`,
  },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedMenu, setSelectedMenu] = useState(pathname.split('/')[1]);
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onSelectMenu = ({ key }: { key: string }) => {
    const toPathname = `/${key}`;
    router.push(toPathname);
    setSelectedMenu(() => key);
  };

  const marginLeft = useMemo(() => (collapsed ? 100 : 200), [collapsed]);

  return (
    <Layout style={{ margin: '0', backgroundColor: 'white' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedMenu]}
          items={items}
          onClick={onSelectMenu}
        />
      </Sider>
      <Layout
        style={{ marginLeft, minHeight: '100vh', backgroundColor: 'white' }}
      >
        <Header
          style={{
            paddingLeft: 14,
            height: 'auto',
            background: colorBgContainer,
          }}
        >
          <Row justify={'space-between'}>
            <Col
              xs={24}
              sm={24}
              md={10}
              lg={10}
              xl={10}
              style={{
                fontWeight: 'bold',
                color: 'darkblue',
                fontSize: 20,
              }}
            >
              PRAKASA MAKMUR KENCANA
            </Col>
            <Col xs={24} sm={24} md={7} lg={7} xl={7}>
              <Row>
                <Col span={4}>
                  <Button size="middle" icon={<BellOutlined />} />
                </Col>
                <Col span={20} style={{ padding: 0 }}>
                  <Input prefix={<SearchOutlined />} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: '2px 16px 0',
            overflow: 'initial',
            backgroundColor: 'white',
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: 'white' }}>
          ©{new Date().getFullYear()} Created by Waney Mamahit
        </Footer>
      </Layout>
    </Layout>
  );
}
