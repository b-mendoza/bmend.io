import { Footer } from 'components/Footer';
import { MainMenu } from 'components/Menus/MainMenu';

import { StyledHeader, StyledContent } from './styled';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout(props: MainLayoutProps): JSX.Element {
  const { children } = props;

  return (
    <>
      <StyledHeader>
        <MainMenu />
      </StyledHeader>

      <StyledContent>{children}</StyledContent>

      <Footer />
    </>
  );
}
