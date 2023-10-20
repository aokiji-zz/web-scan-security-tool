import { Col, Row, Tooltip } from 'antd';
import { AiFillQuestionCircle } from 'react-icons/ai';

interface TooltipQuestionProps {
  title: string;
  text: string;
}
const dictionary = {
  services: 'Determine services or versions, agressive scan',
  stealthScan: 'Less agressive scan',
  UDP: 'UDP scan protocol',
  operationalSystem: 'Determine wich OS run in the target',
  OSVersionTraceroute: '',
  ipProtocol: 'IP protocol scan',
};
// eslint-disable-next-line no-undef
function TooltipQuestion({ title, text }: TooltipQuestionProps): JSX.Element {
  return (
    <Row align="middle" gutter={[7, 7]} wrap={false}>
      <Col>{title}</Col>
      <Col style={{ display: 'flex', alignItems: 'center' }}>
        {/* @ts-ignore */}
        <Tooltip title={dictionary[text]}>
          <AiFillQuestionCircle size={14} />
        </Tooltip>
      </Col>
    </Row>
  );
}
export default TooltipQuestion;
