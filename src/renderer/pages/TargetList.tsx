import { List, Row, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { ITcpScanList } from '../../tools/network-scan/types/scan-network-list.types';

function TargetList() {
  const [targets, setTarget] = useState<ITcpScanList[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    window.electron.ipcRenderer.sendMessage('getTargets', []);
    window.electron.ipcRenderer.on('getTargets', (response: any) => {
      setTarget(response);
      setLoading(false);
    });
  }, []);
  console.log('targets', targets);
  if (loading) return <Spin />;

  return (
    <Row align="top" gutter={[16, 16]}>
      <List dataSource={targets} itemLayout="vertical">
        {targets?.map((e) => {
          return (
            <List.Item>
              <Typography.Text>{e.uuid}</Typography.Text>
              <br />
              <Typography.Text>{e.address[0].addr}</Typography.Text>
              {/* <br />
              <Typography.Text>
                {e?.hostName?.[0]?.names?.[0].name}
              </Typography.Text> */}
              <br />
              <Typography.Text>
                {e.ports.map((port) => {
                  return <p>{port.number}</p>;
                })}
              </Typography.Text>
            </List.Item>
          );
        })}
      </List>
    </Row>
  );
}

export default TargetList;
