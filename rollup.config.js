//@ts-check
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import rootImport from "rollup-plugin-root-import";
import visualizer from 'rollup-plugin-visualizer';
import cleaner from 'rollup-plugin-cleaner';
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import url from '@rollup/plugin-url';
import fs from "fs";
import path from "path";


const sources = ["app"];
let files = {};
const publicDir = "public/assets"
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default sources.map((source) => ({
    input: `assets/${source}.js`,
    output: {
        dir: publicDir,
        format: "es" /** esm | es | cjs | iife */,
        entryFileNames: "[name].[hash].js",
        chunkFileNames: "[name].[hash].js"
    },
    preserveEntrySignatures: false,
    plugins: [
        terser(),
        json(),
        commonjs(),
        resolve({ extensions }),
        url({
            limit: 0,
            publicPath: "assets/"
        }),
        // @ts-ignore
        rootImport({
            root: "assets",
            extensions
        }),
        cleaner({
            targets: [`./${publicDir}`]
        }),
        alias({
            entries: [
                { find: 'react', replacement: 'preact/compat' },
                { find: 'react-dom', replacement: 'preact/compat' }
            ]
        }),
        postcss({
            minimize: true,
            extract: true,
            sourceMap: false
        }),
        visualizer({
            filename: `${publicDir}/${source}.html`
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: ["node_modules/**"],
            extensions
        }),
        // Génère un fichier mix-manifest.json contenant les noms des assets compilés
        {
            name: "manifest",
            writeBundle(options, bundle) {
                // On extrait les noms des fichiers
                Object.values(bundle).forEach((file) => {
                    const name = file.fileName.replace(/(?=\.).*/, "") + path.extname(file.fileName);
                    files = { ...files, [`/${name}`]: `/${file.fileName}` };
                });
                // On écrit le fichier mix-manifest.json
                fs.writeFileSync(path.resolve(__dirname, options.dir, "mix-manifest.json"), JSON.stringify(files), "utf8");
            },
        },
    ],
}));