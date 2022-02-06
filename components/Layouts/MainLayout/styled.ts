import styled from '@emotion/styled';

import { paddingReset, widthReset } from 'styles/mixins/resets';

export const StyledHeader = styled.header`
  background-color: var(--primaryBlackColor);
`;

export const StyledContent = styled.main`
  ${paddingReset};
  ${widthReset};
`;
