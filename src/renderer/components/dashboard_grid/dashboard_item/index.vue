<template>
  <div class="dashboard-item">
    <error-message
      v-show="extensionHasError"
      errorMessageSimple="Something went wrong while loading the extension!"
      :errorMessage="extensionErrorMessage"
    />
    <div class="dasboard-item__extension" v-html="extensionTemplate"></div>
  </div>
</template>

<script>
import { app } from 'electron';
import path from 'path';
import fs from 'fs';
import { error } from 'util';
import { throws } from 'assert';

import ErrorMessage from './../../dashboard_error';

export default {
  name: 'grid_item',

  props: {
    extension: {
      type: String,
      required: true,
    },
    extensionSize: {
      type: Object,
      required: true,
    },
  },

  components: {
    ErrorMessage,
  },

  data() {
    return {
      extensionErrorMessage: '',
      extensionHasError: false,
      extensionLoaded: false,
      extensionData: {
        name: 'New Extension',
        description: 'No description :(',
        version: '-',
        author: '',
      },
      extensionJavascript: {},
      extensionTemplate: '',
      extensionPath: path.join(this.$store.state.appDir, 'extensions', this.extension),
    };
  },

  mounted() {
    this.loadExtensionFiles()
      .then(() => {
        if (this.extensionJavascript.hasOwnProperty('loaded')) {
          this.extensionJavascript.loaded();
        }
      })
      .catch(error => {
        this.showConsoleError(error);
        this.extensionErrorMessage = error;
        this.extensionHasError = true;
      });
  },

  methods: {
    loadExtensionFiles() {
      return new Promise(async (resolve, reject) => {
        try {
          //Loads the json config file
          const configPath = path.join(this.extensionPath, 'extension.json');
          const jsonFileData = this.loadFile(configPath);

          this.extensionData = {
            ...JSON.parse(jsonFileData),
            ...this.extensionData,
          };

          // Loads the javascript file
          if (this.extensionData.js) {
            const javascriptPath = path.join(this.extensionPath, this.extensionData.js);
            const javascriptFileData = this.loadFile(javascriptPath);

            this.extensionJavascript = new Function(
              'element',
              'itemSize',
              `"use strict"; ${javascriptFileData}`,
            )(this.$el, this.extensionSize);

            if (this.extensionJavascript.hasOwnProperty('initialize')) {
              this.extensionJavascript.initialize();
            }
          }

          // Loads the html file
          if (this.extensionData.html) {
            const htmlPath = path.join(this.extensionPath, this.extensionData.html);
            this.extensionTemplate = this.loadFile(htmlPath);
          }

          resolve();
        } catch (e) {
          reject(e);
        }
      });
    },

    loadFile(filePath) {
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8');
      } else {
        throw `File not found! (${filePath})`;
      }
    },

    showConsoleError(error) {
      // TODO: Maybe outsource it and make it more generic?
      console.log(
        `An error occurred while loading the extension \n`,
        `Extension: '${this.extension}' \n`,
        `Error: ${error} \n`,
      );
    },
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
