export interface ITcpScanResponse {
  uuid: string;
  address: {
    addr: string;
    addrType: string;
  }[];
  hostName: {
    names: {
      name: string;
    }[];
  }[];
  ports: {
    number: string;
    protocol: string;
    state: string;
    deviceType: string;
    service: string;
    product: string;
    version: string;
    cpe: string[];
    osType: string;
    extraInfo: string;
  }[][];
}
