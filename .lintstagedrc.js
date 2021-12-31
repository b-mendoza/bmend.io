// @ts-check

module.exports = {
  /** @param {string[]} filenames */

  '**/*.(j|t)s?(x)': (filenames) =>
    `next lint --fix --file ${filenames
      .map((file) => file.split(process.cwd())[1])
      .join(' --file ')}`,

  '**/*.ts?(x)': 'tsc --project ./tsconfig.json --pretty',
  '**': 'prettier -c --config ./.prettierrc -w',
};
