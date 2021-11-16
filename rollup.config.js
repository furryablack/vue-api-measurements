const { terser } = require("rollup-plugin-terser");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");

const plugins = [
  nodeResolve({ skip: ["vue"], extensions: [".js", ".mjs"] }),
  commonjs({ extensions: [".js", ".mjs"] }),
  terser({}),
];

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input: "dist/index.mjs",
    external: ["vue"],
    plugins,

    output: {
      file: "./dist/vue-api-measurements.mjs",
      format: "es",
      sourcemap: true,
      externalLiveBindings: false,
    },
  },

  {
    input: "dist/index.js",
    external: ["vue"],
    plugins,

    output: {
      file: "./dist/vue-api-measurements.cjs.js",
      format: "cjs",
      freeze: false,
      exports: "named",
      sourcemap: true,
      externalLiveBindings: false,
    },
  },

  {
    input: "dist/index.js",
    external: ["vue"],
    plugins,

    output: {
      name: "vue-api-measurements",
      file: "./dist/vue-api-measurements.umd.js",
      format: "umd",
      exports: "named",
      sourcemap: true,
      freeze: false,

      globals: {
        vue: "vue",
      },
    },
  },
];
