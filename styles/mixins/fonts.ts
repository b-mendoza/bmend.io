import { css } from '@emotion/react';

export const injectOpenSansFont = css`
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  font-weight: 400;

  @supports (font-variation-settings: normal) {
    font-family: 'Open SansVariable', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue',
      sans-serif, 'Helvetica Neue', sans-serif;
    font-variation-settings: 'wght' 400;
  }
`;

export const injectFiraCodeFont = css`
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-weight: 400;

  @supports (font-variation-settings: normal) {
    font-family: 'Fira CodeVariable', 'Courier New', Courier, monospace;
    font-variation-settings: 'wght' 400;
  }
`;
