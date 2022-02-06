import { css } from '@emotion/react';

import { Breakpoints } from 'types/constants';

export const paddingReset = css`
  padding: var(--globalPadding);

  @media (min-width: ${Breakpoints.SM}) {
    --globalPadding: 2em;
  }
`;

export const fontSizeReset = css`
  font-size: var(--globalFontSize);

  @media (min-width: ${Breakpoints.SM}) {
    --globalFontSize: 1.6rem;
  }

  @media (min-width: ${Breakpoints.MD}) {
    --globalFontSize: 1.8rem;
  }
`;

export const widthReset = css`
  margin: 0 auto;

  max-width: 120rem;

  @media (min-width: ${Breakpoints.XXL}) {
    max-width: 150rem;
  }
`;
