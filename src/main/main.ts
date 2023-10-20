/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { ITcpScanResponse } from 'tools/network-scan/types';
import axios from 'axios';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import nmap from '../tools/network-scan/nmap-scan.service';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
enum Channels {
  startScan = 'startScan',
  error = 'error',
  cancelScan = 'cancelScan',
  saveTargets = 'saveTargets',
  getTargets = 'getTargets',
}
// initialize nmap scan
ipcMain.on(Channels.startScan, async (event, args: string[]) => {
  const nmapResponde = new Map<string, ITcpScanResponse>();
  const addresses = args[0].replace(/^(https?:\/\/)?([^/]+)(\/.*)?$/, '$2');
  console.log('args', args);
  // let parsedArgs: string = '';
  const parsedArgs = (args[1] || '')
    ?.concat(args?.[2] || '')
    ?.concat(args?.[3] || '');
  // for (let i = 1; i < args.length; i++) {
  //   if (args[i] !== undefined) {
  //     parsedArgs += args[i];
  //   }
  // }
  console.log('parsedArgs', parsedArgs);
  const scan = new nmap.NmapScan(addresses, parsedArgs);
  scan.on('complete', async (data: ITcpScanResponse) => {
    console.log('address', addresses);
    console.log('data', data);
    nmapResponde.set(addresses, data);
    const target = nmapResponde.get(addresses);
    try {
      await axios.post('http://localhost:8483/sendServices', target);
      return event.sender.send(Channels.startScan, target);
    } catch (err) {
      console.log('err', err);
      return event.sender.send(Channels.startScan, target);
    }
  });

  scan.on(Channels.error, (data: string) => {
    console.log('ERROR', JSON.stringify(data, null, 2));
    console.log(`total scan time ${scan.scanTime}`);
    return event.sender.send(Channels.error, data);
  });
  scan.startScan();
});

// cancel nmap scan
ipcMain.on(Channels.cancelScan, async (event, arg: string[]) => {
  const cancel = new nmap.NmapScan(arg[0], arg[1]).cancelScan();
  return cancel;
});

// files
ipcMain.on(Channels.saveTargets, async (event, arg) => {
  if (!arg) return null;
  let existsFile;
  if (existsSync(path.join(__dirname, '../../local-db/targets.json'))) {
    existsFile = JSON.parse(
      readFileSync(path.join(__dirname, '../../local-db/targets.json'), {
        encoding: 'utf-8',
      })
    );
  }
  writeFileSync(
    path.join(__dirname, '../../local-db/targets.json'),
    JSON.stringify([...(existsFile || []), ...(arg || [])])
  );
  console.log('savedTargets', arg);
  return null;
});

ipcMain.on(Channels.getTargets, async (event, arg) => {
  if (!arg) return null;
  let existsFile;
  if (existsSync(path.join(__dirname, '../../local-db/targets.json'))) {
    existsFile = JSON.parse(
      readFileSync(path.join(__dirname, '../../local-db/targets.json'), {
        encoding: 'utf-8',
      })
    );
  }

  console.log('getTargets', existsFile);
  return event.sender.send('getTargets', existsFile);
});
if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('eye.png'),
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */
app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
