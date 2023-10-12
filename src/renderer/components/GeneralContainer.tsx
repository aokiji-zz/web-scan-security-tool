import { Layout, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { BiTargetLock } from "react-icons/bi";
import { GiRadarSweep } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import InputScan from "renderer/pages/home/InputScan";

function GeneralContainer({component, key}:{component:any, key:string}){
    const items: ItemType[] = [
        {
          key,
          icon: (
            <NavLink to="/">
              <GiRadarSweep />,
            </NavLink>
          ),
          label: 'Scan',
        },
        {
          key,
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
                selectedKeys={[key]}
                items={items}
              />
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <div style={{ marginLeft: '2vh', marginTop: '2vh' }}>
               {component}
              </div>
            </Layout>
          </Layout>
        </div>
      );
}

export default GeneralContainer