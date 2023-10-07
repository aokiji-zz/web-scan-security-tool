import { Layout, Menu, MenuProps } from 'antd';

import React from 'react';

import Sider from 'antd/lib/layout/Sider';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import InputScan from './InputScan';

export function Home() {
  const items: MenuProps['items'] = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
  ].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }));

  return (
    <div>
      <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            maxWidth: 130,
          }}
        >
          {' '}
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
            items={items}
          />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <InputScan />
        </Layout>
      </Layout>
    </div>
  );
}
export default Home;
