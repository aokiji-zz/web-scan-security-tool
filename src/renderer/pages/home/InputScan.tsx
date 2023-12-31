import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  List,
  Row,
  Select,
  Spin,
  Typography,
} from 'antd';
import { AiOutlineSend } from 'react-icons/ai';
import { MdOutlineCancelScheduleSend } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import {
  ITcpScanResponse,
  ScanTypeSelect,
  ScriptSelect,
} from '../../../tools/network-scan/types';
import TooltipQuestion from './components/tooltop-question';

type FormParam = {
  address: string;
  scanType?: string[];
  port?: string;
  script?: string;
};
function InputScan() {
  const [target, setTarget] = useState<ITcpScanResponse[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const resp = window.electron.ipcRenderer.on('startScan', (response: any) => {
    setTarget(response);
    setLoading(false);
  });
  const respError = window.electron.ipcRenderer.on(
    'error',
    (responseError: any) => {
      console.log('responseError', responseError);
      setLoading(false);
    }
  );
  useEffect(() => {}, [resp, respError]);
  const [form] = Form.useForm();
  // const { list } = useStyle();
  const formName = {
    address: 'address',
    scanType: 'scanType',
    port: 'port',
    script: 'script',
  };

  const [formValues, setFormValues] = useState<FormParam>();
  const { Option } = Select;
  async function startScan() {
    const { address, scanType, port, script } = formValues as FormParam;
    window.electron.ipcRenderer.sendMessage('startScan', [
      address,
      scanType,
      port ? `-p${port}` : undefined,
      script?.length ? `--script=${script}` : undefined,
    ]);
    setLoading(true);
  }

  async function cancelScan() {
    window.electron.ipcRenderer.sendMessage('cancelScan', []);
    setLoading(false);
  }

  // eslint-disable-next-line consistent-return
  // window.document.addEventListener('keypress', (event) => {
  //   if (event.key === 'Enter' && (formValues?.address?.length as any) >= 7)
  //     return startScan();
  //   return cancelScan();
  // });

  const dataSource =
    target instanceof Array
      ? target?.map((hosts) => {
          return {
            uuid: v4(),
            hostName: hosts?.hostName?.map((host) => {
              return {
                names: host?.names?.map((name) => {
                  return {
                    name,
                  };
                }),
              };
            }),
            address: hosts?.address?.map((addr) => {
              return {
                addr: addr?.addr,
                addrType: addr?.addrType,
              };
            }),
            ports: hosts?.ports?.[0]?.map<ITcpScanResponse['ports'][0][0]>(
              (port) => {
                return {
                  version: port?.version,
                  cpe: port?.cpe,
                  protocol: port?.protocol,
                  service: port?.service,
                  state: port?.state,
                  number: port?.number,
                  osType: port?.osType,
                  product: port?.product,
                  deviceType: port?.deviceType,
                  extraInfo: port?.extraInfo,
                };
              }
            ),
          };
        })
      : undefined;

  return (
    <>
      <Row align="top" gutter={[16, 16]}>
        <Form
          form={form}
          style={{
            display: 'flex',
            // marginLeft: '30px',
            // marginTop: '16px',
          }}
          onValuesChange={(changedValues, allValues) => {
            setFormValues((oldValues) => ({ ...oldValues, ...allValues }));
          }}
        >
          <Col>
            <Typography.Text>Address</Typography.Text>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name={formName.address}
            >
              <Input
                style={{ width: '100%' }}
                placeholder="1.1.1.1 or url"
                disabled={loading}
              />
            </Form.Item>
          </Col>
          <Col>
            <Typography.Text>Scan Type</Typography.Text>
            <Form.Item name={formName.scanType}>
              <Select
                placeholder="Scan Type"
                allowClear
                mode="multiple"
                style={{ width: '200px' }}
              >
                {Object.keys(ScanTypeSelect).map((type) => {
                  return (
                    <Option
                      disabled={
                        // eslint-disable-next-line no-nested-ternary
                        formValues?.scanType?.find((e) => e === '-sO')
                          ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            ScanTypeSelect[type] !== '-sO'
                          : undefined
                      }
                      key={type}
                      label={type}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      value={ScanTypeSelect[type]}
                    >
                      <TooltipQuestion title={type} text={type} />
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Typography.Text>Scripts</Typography.Text>
            <Form.Item name="script">
              <Select
                placeholder="Script"
                allowClear
                style={{ width: '200px' }}
              >
                {Object.keys(ScriptSelect).map((type) => (
                  <Option
                    key={type}
                    label={type}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    value={ScriptSelect[type]}
                  >
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Typography.Text>Port</Typography.Text>
            <Form.Item name={formName.port}>
              <Input placeholder="1-80" />
            </Form.Item>
          </Col>
        </Form>

        <Col>
          {!loading ? (
            <Button
              style={{
                marginLeft: '16px',
                marginTop: '15px',
              }}
              // className={buttonSend}
              icon={<AiOutlineSend className="anticon" />}
              loading={loading}
              disabled={
                loading ||
                (formValues?.address?.length as any) <= 7 ||
                !formValues
              }
              onClick={() => {
                startScan();
              }}
            />
          ) : (
            <Button
              style={{
                backgroundColor: 'red',
                marginLeft: '16px',
                marginTop: '15px',
              }}
              // className={buttonSend}
              icon={<MdOutlineCancelScheduleSend className="anticon" />}
              onClick={() => {
                cancelScan();
              }}
            />
          )}
          <Button
            onClick={() => [
              window.electron.ipcRenderer.sendMessage(
                'saveTargets',
                dataSource
              ),
              window.electron.ipcRenderer.sendMessage('findExploit', ['alo']),
            ]}
          >
            Save
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col style={{ width: '100%', height: '100%' }}>
          {loading && dataSource === undefined ? (
            <Spin style={{ alignContent: 'center' }} />
          ) : (
            <div>
              <List
                itemLayout="vertical"
                size="small"
                bordered
                // className={list}
                loading={loading}
                dataSource={dataSource}
                renderItem={(item, index) => {
                  return (
                    <>
                      <Divider dashed />
                      {item?.address?.length > 0 && (
                        <List.Item key={index}>
                          <p>
                            Name:{' '}
                            {
                              item?.hostName?.[index]?.names?.[index]?.name
                                ?.name
                            }
                          </p>
                          <Divider dashed />
                          <p>
                            Address:{' '}
                            {item?.address?.find((addr) => addr?.addr)?.addr}
                          </p>
                          {item?.ports?.map((serv) => {
                            return (
                              <>
                                <Divider />
                                <p>Port: {serv.number}</p>
                                <p>Protocol: {serv.protocol}</p>
                                <p>Service: {serv.service}</p>
                                <p>Product: {serv.product}</p>
                                <p>Version: {serv.version}</p>
                                {serv.osType && <p>OS Type: {serv.osType}</p>}
                                <p>State: {serv.state}</p>
                                <p>Device Type: {serv.deviceType}</p>
                                <p>Extra Info: {serv.extraInfo}</p>
                                <p>
                                  cpe: {serv?.cpe?.map((e) => e?.concat(' '))}
                                </p>
                              </>
                            );
                          })}
                          <Divider />
                        </List.Item>
                      )}
                    </>
                  );
                }}
              />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}

export default InputScan;
