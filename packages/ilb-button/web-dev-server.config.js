import { esbuildPlugin } from "@web/dev-server-esbuild";
import { resolveScssPlugin } from '../../resolve-scss-plugin.mjs';

export default {
  plugins: [
    resolveScssPlugin(),
    esbuildPlugin({ ts: true })
  ],
};