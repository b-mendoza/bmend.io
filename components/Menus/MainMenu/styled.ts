import styled from '@emotion/styled';

import { paddingReset, widthReset } from 'styles/mixins/resets';

export const StyledMenu = styled.ul`
  ${paddingReset};

  ${widthReset};

  align-items: center;

  color: var(--primaryWhiteColor);

  display: flex;

  justify-content: space-between;
`;
