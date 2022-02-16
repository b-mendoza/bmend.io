// @ts-check

module.exports = {
  '*': 'prettier -c --config ./.prettierrc -w',
  '**/*.(j|t)s?(x)': 'eslint',
};
