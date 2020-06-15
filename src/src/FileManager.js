import fs from "fs";
import path from "path";

export default class FileManager {
  constructor(appDir) {
    this.appDir = appDir;
    this.configFile = path.join(this.appDir, "config.json");

    this.prepare();
  }

  prepare() {
    if (!fs.existsSync(this.appDir)) {
      fs.mkdirSync(this.appDir, { recursive: true });
    }
  }

  readStateFile() {
    try {
      return JSON.parse(fs.readFileSync(this.configFile, "utf-8"));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(
        `${e} \nSomething went wrong while reading the config file. \n At: ${this.configFile}`
      );
      return {};
    }
  }

  writeStateFile(state) {
    fs.writeFile(this.configFile, JSON.stringify(state), (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(
          `${err} \nSomething went wrong while writing the config file. \n At: ${this.configFile}`
        );
      }
    });
  }
}
