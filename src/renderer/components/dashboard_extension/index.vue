<template>
  <div>
    <error-message
      v-if="extensionHasError"
      errorMessageHeader="Something went wrong while loading the extension!"
      :errorMessage="extensionErrorMessage"
    />
    <div v-else-if="extensionLoaded" class="dasboard-item__extension" v-html="extensionTemplate"></div>
    <div v-else>Loading...</div>
  </div>
</template>
<script>
import path from 'path';
import fs from 'fs';

import ErrorMessage from '../dashboard_error';

export default {
  name: 'extension',

  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
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
      extensionPath: path.join(this.$store.state.appDir, 'extensions', this.name),
    };
  },

  mounted() {
    this.loadExtensionFiles()
      .then(() => {
        this.extensionLoaded = true;

        if (Object.prototype.hasOwnProperty.call(this.extensionJavascript, 'loaded')) {
          this.$nextTick(() => {
            this.extensionJavascript.loaded();
          });
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
          // Loads the json config file
          const configPath = path.join(this.extensionPath, 'extension.json');
          const jsonFileData = this.loadFile(configPath);

          this.extensionData = {
            ...this.extensionData,
            ...JSON.parse(jsonFileData),
          };

          // Loads the javascript file
          if (this.extensionData.js) {
            const javascriptPath = path.join(this.extensionPath, this.extensionData.js);
            const javascriptFileData = this.loadFile(javascriptPath);

            // eslint-disable-next-line no-new-func
            this.extensionJavascript = new Function(
              'element',
              'itemSize',
              `"use strict"; ${javascriptFileData}`,
            )(this.$el, this.extensionSize);

            // check if class
            if (typeof this.extensionJavascript === 'function') {
              const extensionClass = this.extensionJavascript;
              // eslint-disable-next-line new-cap
              this.extensionJavascript = new extensionClass();
            }

            if (Object.prototype.hasOwnProperty.call(this.extensionJavascript, 'initialize')) {
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
      }
      throw new Error(`File not found! (${filePath})`);
    },

    showConsoleError(error) {
      // TODO: Maybe outsource it and make it more generic?
      // eslint-disable-next-line no-console
      console.error(
        'An error occurred while loading the extension \n',
        `Extension: '${this.extension}' \n`,
        `Error: ${error} \n`,
      );
    },
  },
};
</script>
<style  lang="scss" src="./styles.scss" scoped>
</style>
