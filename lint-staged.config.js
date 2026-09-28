const EMPTY_FILE_COUNT = 0;

/** @param {string} file */
const isClaudeSkillPath = (file) => file.includes('/.claude/skills/');

export default {
  /** @param {string[]} files */
  '*': (files) => {
    const filtered = files.filter((file) => !isClaudeSkillPath(file));

    if (filtered.length === EMPTY_FILE_COUNT) {
      return [];
    }

    return [`prettier --ignore-unknown --write ${filtered.join(' ')}`];
  },
  '*.{js,ts,tsx}': 'eslint --fix',
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
};
