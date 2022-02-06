import { memo } from 'react';
import { v4 as uuid4 } from 'uuid';

import { LinkTo } from 'components/Customs/LinkTo';
import { StyledFooter, StyledWrapper } from './styled';

interface MenuItem {
  content: string;
  href: string;
  id: string;
}

const menuItemList: MenuItem[] = [{ content: 'Home', href: '/', id: uuid4() }];

function MemoizedFooter(): JSX.Element {
  return (
    <StyledFooter>
      <StyledWrapper>
        <LinkTo href="/">
          <h4>bMend_</h4>
        </LinkTo>
        <p>Made with ❤️ by bMend_</p>
        <nav>
          <ul>
            {menuItemList.map((menuItem) => (
              <li key={menuItem.id}>
                <LinkTo href={menuItem.href}>{menuItem.content}</LinkTo>
              </li>
            ))}
          </ul>
        </nav>
      </StyledWrapper>
    </StyledFooter>
  );
}

export const Footer = memo(MemoizedFooter);
