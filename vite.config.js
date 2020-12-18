// @ts-check
const path = require("path");

const root = "./assets";

/**
 * @type { import('vite').UserConfig }
 */
const config = {
    emitManifest: true,
    cors: true,
    optimizeDeps: {
        include: ["gia/loadComponents", "gia/Component"]
    },
    root,
    configureServer: function ({ root, watcher }) {
        watcher.add(path.resolve(root, "../resources/**/*.blade.php"));
        watcher.on("change", function (path) {
            if (path.endsWith(".blade.php")) {
                watcher.send({
                    type: "full-reload",
                    path,
                });
            }
        });
    },
};

module.exports = config;