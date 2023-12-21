export default {
  '*': 'prettier --ignore-unknown --write',
  '*.{js,ts,tsx}': 'eslint --fix',
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
};
