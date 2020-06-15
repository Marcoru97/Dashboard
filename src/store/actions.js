import fs from "fs";
import path from "path";

import types from "./types";

export default {
  [types.actions.LOAD_AVAILABLE_EXTENSIONS]({ commit, state }) {
    commit(types.mutations.CLEAR_AVAILABLE_EXTENSIONS);

    return new Promise((resolve) => {
      const files = fs.readdirSync(path.join(state.appDir, "extensions"));

      files.forEach((file) => {
        const extensionPath = path.join(
          state.appDir,
          "extensions",
          file,
          "extension.json"
        );
        // Check if the extension config exists
        if (fs.existsSync(extensionPath)) {
          commit(types.mutations.ADD_AVAILABLE_EXTENSION, file);
        }
      });

      resolve();
    });
  },
};
