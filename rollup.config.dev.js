/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import serve from 'rollup-plugin-serve';
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import livereload from 'rollup-plugin-livereload';
import svg from 'rollup-plugin-inline-svg';
import postcss from 'rollup-plugin-postcss';
import postcssLit from 'rollup-plugin-postcss-lit';
import { join } from 'path';

const port = +(process.argv.find((t) => t.includes('port='))?.split('=')[1] || 10001);

export default {
  input: join('src', 'index.ts'),
  output: {
    file: join('dev', 'index.js'),
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    typescript(),
    replace({ 'Reflect.decorate': 'undefined', preventAssignment: true }),
    resolve(),
    postcss({ inject: false }),
    postcssLit(),
    svg(),
    serve({
      port,
      open: true,
      verbose: true,
      contentBase: ['dev', join('..', '..', 'static')],
    }),
    livereload({ watch: 'dev' }),
  ],
};
