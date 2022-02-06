import styled from '@emotion/styled';

import { paddingReset, widthReset } from 'styles/mixins/resets';

export const StyledFooter = styled.footer`
  background-color: var(--primaryBlackColor);

  color: var(--primaryWhiteColor);
`;

export const StyledWrapper = styled.div`
  ${paddingReset};
  ${widthReset};

  align-items: center;

  display: flex;

  flex-wrap: wrap;

  gap: var(--spaceBetweenElements);

  justify-content: space-between;
`;
