module.exports = (version) => ({
  name: 'vue-api-measurements',
  version: `${version}`,
  description: 'Vue 3 api measurements',
  main: 'vue-api-measurements.cjs.js',
  types: 'index.d.ts',
  module: 'vue-api-measurements.mjs',
  browser: 'vue-api-measurements.umd.js',
  sideEffects: false,

  repository: {
    type: 'git',
    url: 'git+https://github.com/furryablack/vue-api-measurements.git',
  },

  keywords: ['vue', 'lib', 'stdlib', 'util'],
  author: `Furrya Black <furrya.black@gmail.com>`,
  license: 'MIT',

  bugs: {
    url: 'https://github.com/furryablack/vue-api-measurements/issues',
  },

  homepage: 'https://github.com/furryablack/vue-api-measurements#readme',

  peerDependencies: {
    vue: '^3.2.0',
  },
});
