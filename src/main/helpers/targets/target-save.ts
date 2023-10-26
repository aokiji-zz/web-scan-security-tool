import ElectronStore from 'electron-store';
import { ITcpScanList } from '../../../tools/network-scan/types/scan-network-list.types';

export function storeSaveTargets(store: ElectronStore, arg: ITcpScanList[]) {
  arg.map((targ) => {
    console.log('saved target', (store.size + 1 || 1).toString(), targ);
    store.set((store.size + 1 || 1).toString(), targ);
    return null;
  });
}
export function storeGetTargets(store: ElectronStore) {
  const data: ITcpScanList[] = [];
  // eslint-disable-next-line no-plusplus
  for (let size = 1; size < store.size + 1; size++) {
    // @ts-ignore
    data.push(store.get(size.toString()));
  }
  console.log('datas', data);
  return data;
}
