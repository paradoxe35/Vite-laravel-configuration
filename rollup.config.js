//@ts-check
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import rootImport from "rollup-plugin-root-import";
import visualizer from 'rollup-plugin-visualizer';
import cleaner from 'rollup-plugin-cleaner';
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import fs from "fs";
import path from "path";


const sources = ["app"];

let files = {};

const publicDir = "public/assets"

export default sources.map((source) => ({
    input: `assets/${source}.js`,
    output: {
        dir: publicDir,
        format: "es" /** esm | es | cjs | iife */,
        entryFileNames: "[name].[hash].js",
        chunkFileNames: "[name].[hash].js",
        plugins: [terser()]
    },
    preserveEntrySignatures: false,
    plugins: [
        // @ts-ignore
        rootImport({ root: "assets" }),
        cleaner({
            targets: [`./${publicDir}`]
        }),
        postcss({ extract: true, minimize: true, sourceMap: false }),
        json(),
        commonjs(),
        visualizer({
            filename: `${publicDir}/${source}.html`
        }),
        resolve(),
        babel({ babelHelpers: 'bundled' }),
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