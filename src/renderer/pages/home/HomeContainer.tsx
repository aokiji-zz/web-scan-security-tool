import { Layout, Menu } from 'antd';

import React from 'react';

import Sider from 'antd/lib/layout/Sider';
import { GiRadarSweep } from 'react-icons/gi';
import { BiTargetLock } from 'react-icons/bi';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { NavLink } from 'react-router-dom';
import InputScan from './InputScan';
import GeneralContainer from 'renderer/components/GeneralContainer';

function HomeContainer() { 
  return <GeneralContainer component={<InputScan/>} key='1'/>
}
export default HomeContainer;
