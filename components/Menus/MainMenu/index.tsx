import { memo } from 'react';
import { v4 as uuid4 } from 'uuid';

import { LinkTo } from 'components/Customs/LinkTo';

import { StyledMenu } from './styled';

interface MenuItem {
  content: string;
  href: string;
  id: string;
  isBrand: boolean;
}

const menuItemList: MenuItem[] = [
  { href: '/', id: uuid4(), isBrand: true, content: 'bMend_' },
  { href: '/', id: uuid4(), isBrand: false, content: 'Home' },
];

function MemoMainMenu(): JSX.Element {
  return (
    <nav>
      <StyledMenu>
        {menuItemList.map((menuItem) => (
          <li key={menuItem.id}>
            <LinkTo href={menuItem.href}>
              {menuItem.isBrand ? (
                <h3>{menuItem.content}</h3>
              ) : (
                menuItem.content
              )}
            </LinkTo>
          </li>
        ))}
      </StyledMenu>
    </nav>
  );
}

export const MainMenu = memo(MemoMainMenu);
