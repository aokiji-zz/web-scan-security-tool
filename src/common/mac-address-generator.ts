import crypto from 'crypto';

function generateMACAddress() {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  const macBuffer = crypto.randomBytes(6);
  // Set the local bit and the unicast bit
  // eslint-disable-next-line no-bitwise
  macBuffer[0] |= 0x2;
  // eslint-disable-next-line no-bitwise
  macBuffer[0] &= 0xfe;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const macAddress = macBuffer.toString('hex').match(/../g).join(':');
  if (macRegex.test(macAddress)) {
    console.log('valid mac address');
  } else {
    console.log('not valid mac address');
  }
  return macAddress;
}
export default generateMACAddress();
