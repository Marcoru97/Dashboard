import fs from 'fs';
import path from 'path';

// TODO: Better names / Better Filename!
export default class FileReader {
  constructor(path) {
    this.appDir = path;
  }

  getTabFileNames() {
    const tabsDir = path.join(this.appDir, 'tabs');

    return fs.readdirSync(tabsDir).filter(file => file.endsWith('.json'));
  }

  readTabFile(tabFile) {
    const file = path.join(this.appDir, 'tabs', tabFile);

    try {
      return JSON.parse(fs.readFileSync(file, 'utf-8'));
    } catch (e) {
      // TODO: Handle it!
      return {};
    }
  }

  readConfigFile() {
    const configFile = path.join(this.appDir, 'config.json');

    try {
      return JSON.parse(fs.readFileSync(configFile, 'utf-8'));
    } catch (e) {
      // TODO: Handle it!
      return {};
    }
  }

  readCacheFile() {
    const cacheFile = path.join(this.appDir, 'cache.json');

    try {
      return JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
    } catch (e) {
      // TODO: Handle it!
      return {};
    }
  }
}
