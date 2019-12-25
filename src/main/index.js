import { app, BrowserWindow } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import path from 'path';

if (process.env.NODE_ENV !== 'development') {
  // eslint-disable-next-line no-underscore-dangle
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\');
}

let mainWindow;
const winURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080'
    : `file://${__dirname}/index.html`;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 563,
    frame: false,
    backgroundColor: '#212121',
  });

  mainWindow.loadURL(winURL);

  mainWindow.setMenu(null);

  mainWindow.webContents.on('did-finish-load', () => {
    const configDir = path.normalize(path.join(app.getPath('appData'), 'Dashy'));

    mainWindow.webContents.send('configDir', configDir);
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
