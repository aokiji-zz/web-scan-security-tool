import { Layout, Menu } from 'antd';

import React from 'react';

import Sider from 'antd/lib/layout/Sider';
import { GiRadarSweep } from 'react-icons/gi';
import { BiTargetLock } from 'react-icons/bi';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { NavLink } from 'react-router-dom';
import InputScan from './InputScan';

function HomeContainer() {
  const items: ItemType[] = [
    {
      key: '1',
      icon: (
        <NavLink to="/">
          <GiRadarSweep />,
        </NavLink>
      ),
      label: 'Scan',
    },
    {
      key: '2',
      icon: (
        <NavLink to="/targets">
          <BiTargetLock />
        </NavLink>
      ),
      label: 'Targets',
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
            width: '100vh',
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={items}
          />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <div style={{ marginLeft: '2vh', marginTop: '2vh' }}>
            <InputScan />
          </div>
        </Layout>
      </Layout>
    </div>
  );
}
export default HomeContainer;
