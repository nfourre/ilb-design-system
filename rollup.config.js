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

import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import svg from 'rollup-plugin-inline-svg';
import postcss from 'rollup-plugin-postcss';
import postcssLit from 'rollup-plugin-postcss-lit';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import { join } from 'path';

export default {
  input: join('src', 'index.ts'),
  output: {
    file: join('dist', 'index.js'),
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    peerDepsExternal(),
    typescript({
      exclude: ['src/**/*.spec.ts', 'src/**/*.stories.ts'],
    }),
    replace({ 'Reflect.decorate': 'undefined', preventAssignment: true }),
    resolve(),

    postcss({ inject: false }),
    postcssLit(),
    terser({
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    filesize({
      showBrotliSize: true,
    }),
    svg(),
  ],
  external: id => {
    if (/^lit/.test(id)) {
      return true;
    }
    return id.startsWith('@boulanger-common-design-system') && !id.startsWith('@boulanger-common-design-system/bl-icons')
  }
};
