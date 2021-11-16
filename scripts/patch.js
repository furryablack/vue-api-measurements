/* eslint-disable import/no-extraneous-dependencies */
const {resolve: resolvePath} = require('path');
const replace = require('replace-in-file');
const {PKG_NAME} = require('./libraries')

async function mjsFixVueDefaultImportInFromBundler() {
  replace({
    files: `${resolvePath('./')}/dist/${PKG_NAME}.mjs`,
    processor: (input) => input.replace(/import t from"vue"/gm, "import * as t from \"vue\""),
  })
}

async function main() {
  await mjsFixVueDefaultImportInFromBundler();
}

main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
