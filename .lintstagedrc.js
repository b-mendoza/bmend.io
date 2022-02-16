// @ts-check

const path = require('path');

/** @param {string[]} filenames */

const buildESLintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((filename) => path.relative(process.cwd(), filename))
    .join(' --file ')}`;

module.exports = {
  '*': 'prettier -c --config ./.prettierrc -w',
  '**/*.(j|t)s?(x)': [buildESLintCommand],
};
