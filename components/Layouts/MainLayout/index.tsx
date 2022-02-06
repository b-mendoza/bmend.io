import { memo } from 'react';

import { Footer } from 'components/Footer';
import { MainMenu } from 'components/Menus/MainMenu';

import { StyledHeader, StyledContent } from './styled';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MemoizedMainLayout(props: MainLayoutProps): JSX.Element {
  return (
    <>
      <StyledHeader>
        <MainMenu />
      </StyledHeader>

      <StyledContent>{props.children}</StyledContent>

      <Footer />
    </>
  );
}

export const MainLayout = memo(MemoizedMainLayout);
