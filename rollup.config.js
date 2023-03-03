import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  output: {
    file: './dist/index.mjs',
    format: 'esm',
  },
  plugins: [
    json(),
    commonjs(),
    resolve({ exportConditions: ['node'], preferBuiltins: true }),
    typescript(),
  ],
  onwarn: (warning) => {
    if (warning.code === 'CIRCULAR_DEPENDENCY') {
      return;
    }

    console.warn(`(!) ${warning.message}`);
  },
};
