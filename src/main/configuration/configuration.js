import fs from 'fs';
import path from 'path';
import { app } from 'electron';

const name = 'dashy';
const fileExtension = '.json';

const mainSettings = {
  showSettingsIcon: true,
};

const itemDataSettings = [
  {
    position: 0,
    name: 'Welcome',
    module: 'welcome',

    size: { width: 8, height: 1 },
  },
  {
    position: 1,
    name: 'Getting started',
    module: 'getting_started',
    size: { width: 8, height: 1 },
  },
];

class Configuration {
  constructor(dir, file, defaultSettings) {
    this.file = file;
    this.settings = defaultSettings;
    this.dirPath = path.normalize(path.join(app.getPath('appData'), name, dir));
    this.completePath = this.dirPath + path.sep + this.file + fileExtension;

    // Make dir if not exists
    if (!fs.existsSync(this.dirPath)) {
      fs.mkdirSync(this.dirPath);
    }

    if (fs.existsSync(this.completePath)) {
      this.readConfig();
    } else {
      this.writeConfig();
    }
  }

  readConfig() {
    try {
      this.settings = JSON.parse(fs.readFileSync(this.completePath, 'utf8'));
    } catch (e) {
      console.log('Failed to read config file!');
    }
  }

  writeConfig() {
    try {
      fs.writeFileSync(this.completePath, JSON.stringify(this.settings, null, 2), 'utf-8');
    } catch (e) {
      console.log('Failed to read config file!');
    }
  }

  getConfiguration() {
    return this.settings;
  }
}

export const MainConfiguration = new Configuration('', 'config', mainSettings);
export const ItemDataConfiguration = new Configuration('templates', 'itemData', itemDataSettings);
