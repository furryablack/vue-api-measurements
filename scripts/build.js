// eslint-disable-next-line import/no-extraneous-dependencies
const globby = require('globby');

const {version} = require('../package.json');
const {
  createCommonJsIndex,
  createTypingsIndex,
  createDistribution,
  createMjsIndex,
  createExportsMap,
} = require('./libraries');
const packageJson = require('./source.package.js');

const packageMarker = 'index.ts';

async function main() {
  const library = process.env.LIBRARY_NAME ?? 'vue-api-measurements';
  const pkg = packageJson(version);
  pkg.name = library;
  const directory = await createDistribution('./dist');
  await directory.copyList('./', ['README.md', 'LICENSE']);
  const found = await globby(`./src/*/${packageMarker}`);

  const names = found.map((name) =>
    name.replace(`/${packageMarker}`, '').replace('./src/', ''),
  );

  pkg.exports = {
    '.': {
      require: './index.js',
      import: './index.mjs',
      default: './index.mjs',
    },

    ...createExportsMap(names),
  };

  await directory.write('index.js', createCommonJsIndex(names));
  await directory.write('index.mjs', createMjsIndex(names));
  await directory.write('index.d.ts', createTypingsIndex(names));
  await directory.write('package.json', JSON.stringify(pkg));
}

main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
