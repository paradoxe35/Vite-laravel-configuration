// @ts-check
import prefresh from '@prefresh/vite'
import path from 'path'

const root = "./assets";


/**
 * @type { import('vite').UserConfig }
 */
const config = {
    alias: {
        react: "preact/compat",
        "react-dom": "preact/compat",
    },
    emitManifest: true,
    jsx: "preact",
    cors: true,
    optimizeDeps: {
        include: [
            "gia/loadComponents",
            "gia/Component",
            "gia/removeComponents",
            "gia/config"
        ],
    },
    root,
    configureServer: [
        function ({ root, watcher, app }) {
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
        function ({ app }) {
            app.use(async (ctx, next) => {
                await next()
                if (/\.(svg|png|jp(e)?g|gif)\?\import$/.test(ctx.url)) {
                    const code = `${ctx.body}`
                    const getPath = code.split('')
                        .reduce((acc, c) => {
                            if (!acc.length && c === '"') {
                                acc += c
                            } else if (acc.length && c.length) {
                                acc += c
                            }
                            return acc
                        }, '')
                    const originPath = `"${ctx.URL.origin || ''}${getPath.substr(1)}`
                    ctx.body = code.replace(getPath, originPath)
                }
            })
        }
    ],
    plugins: [prefresh()]
};

module.exports = config;