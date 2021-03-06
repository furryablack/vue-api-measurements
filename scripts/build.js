// eslint-disable-next-line import/no-extraneous-dependencies
const globby = require('globby');

const {
  createCommonJsIndex,
  createTypingsIndex,
  createDistribution,
  createMjsIndex,
  createExportsMap,
  PKG_NAME,
  PKG_VERSION,
} = require('./libraries');

const packageJson = require('./source.package.js');

const packageMarker = 'index.ts';

async function main() {
  const pkg = packageJson(PKG_VERSION);
  pkg.name = PKG_NAME;
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
  await directory.write('package.json', JSON.stringify(pkg, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
