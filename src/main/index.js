import { app, BrowserWindow, Menu } from 'electron';

import {
  MainConfiguration,
  ItemDataConfiguration,
  CONFIG_DIR,
} from './configuration/configuration.js';

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\');
}

let mainWindow;
const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 563,
    frame: false,
  });

  mainWindow.loadURL(winURL);

  mainWindow.setMenu(null);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('configDir', CONFIG_DIR);
    mainWindow.webContents.send('mainConfiguration', MainConfiguration.getConfiguration());
    mainWindow.webContents.send('itemDataConfiguration', ItemDataConfiguration.getConfiguration());
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
