import { List, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { ITcpScanResponse } from '../../tools/network-scan/types';

function TargetList() {
  const [targets, setTarget] = useState<ITcpScanResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    window.electron.ipcRenderer.sendMessage('getTargets', []);
    window.electron.ipcRenderer.on('getTargets', (response: any) => {
      setTarget(response);
      setLoading(false);
    });
  }, []);
  console.log('target', targets);
  if (loading) return <Spin />;
  return (
    <Row align="top" gutter={[16, 16]}>
      <List itemLayout="horizontal">
        {targets.map((e) => {
          return <List.Item>{e.address[0].addr}</List.Item>;
        })}
      </List>
    </Row>
  );
}

export default TargetList;
