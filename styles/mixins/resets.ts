import { css } from '@emotion/react';

import { Breakpoint } from 'types/constants';

export const paddingReset = css`
  padding: var(--globalPadding);

  @media (min-width: ${Breakpoint.SM}) {
    --globalPadding: 2em;
  }
`;

export const fontSizeReset = css`
  font-size: var(--globalFontSize);

  @media (min-width: ${Breakpoint.SM}) {
    --globalFontSize: 1.6rem;
  }

  @media (min-width: ${Breakpoint.MD}) {
    --globalFontSize: 1.8rem;
  }
`;

export const widthReset = css`
  margin: 0 auto;

  max-width: 120rem;

  @media (min-width: ${Breakpoint.XXL}) {
    max-width: 150rem;
  }
`;
