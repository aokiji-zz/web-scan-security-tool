import { List, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { ITcpScanList } from '../../tools/network-scan/types/scan-network-list.types';

function TargetList() {
  const [targets, setTarget] = useState<ITcpScanList[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    window.electron.ipcRenderer.sendMessage('getTargets', []);
    window.electron.ipcRenderer.on('getTargets', (response: any) => {
      console.log('responde', response);
      setTarget(response);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spin />;

  return (
    <Row align="top" gutter={[16, 16]}>
      <List dataSource={targets} itemLayout="horizontal">
        {targets?.map((e) => {
          return <List.Item>{e?.uuid}</List.Item>;
        })}
      </List>
    </Row>
  );
}

export default TargetList;
