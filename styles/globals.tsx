import { css, Global } from '@emotion/react';

import { injectFiraCodeFont, injectOpenSansFont } from './mixins/fonts';
import { fontSizeReset } from './mixins/resets';

export const globalStyles = (
  <Global
    styles={css`
      :root {
        --globalFontSize: 1.4rem;
        --globalPadding: 1.5em;

        --primaryBlackColor: #000;
        --primaryWhiteColor: #fff;

        --spaceBetweenElements: 1.5em;
      }

      html {
        box-sizing: border-box;

        font-size: 62.5%;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        ${fontSizeReset}
        ${injectOpenSansFont}
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        ${injectFiraCodeFont}

        font-weight: 600;

        @supports (font-variation-settings: normal) {
          font-variation-settings: 'wght' 600;
        }

        margin: 0;
      }

      p {
        margin: 0;
      }

      a {
        color: inherit;

        display: inline-block;

        text-decoration: none;
      }

      a:focus,
      a:hover {
        background-color: var(--primaryWhiteColor);

        color: var(--primaryBlackColor);
      }

      ul,
      ol {
        list-style: none;

        margin: 0;

        padding: 0;
      }

      textarea {
        resize: vertical;
      }
    `}
  />
);
