import { Layout, Menu } from 'antd';

import React from 'react';

import Sider from 'antd/lib/layout/Sider';
import { GiRadarSweep } from 'react-icons/gi';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import InputScan from './InputScan';

export function Home() {
  const items: ItemType[] = [
    {
      key: '1',
      icon: <GiRadarSweep />,
      label: 'Scan',
      onClick: () => console.log('alo'),
    },
  ];
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
            maxWidth: 100,
          }}
        >
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
