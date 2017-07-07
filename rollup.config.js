import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

import { version, name, license, author, homepage } from './package.json';

const banner = `
/**! ${name} - v${version}
 * ${homepage}
 * Copyright (c) ${(new Date().getFullYear())} - ${author};
 * Licensed ${license}
 */
`;

const baseConfig = {
    entry: 'src/umd.js',
    format: 'umd',
    moduleName: 'domUtils',
    plugins: [
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        })
    ],
    dest: 'umd/index.js',
    banner,
    external: ['desandro-classie'],
    globals: {
        'desandro-classie': 'classie'
    },
    sourceMap: true
};

export default [
    baseConfig,
    Object.assign({}, baseConfig, {
        dest: 'umd/index.min.js',
        plugins: baseConfig.plugins.concat([uglify()])
    })
];