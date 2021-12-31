import { memo } from 'react';
import { v4 as uuid4 } from 'uuid';

import { LinkTo } from '@/components/Customs/LinkTo';

import styles from './MainMenu.module.scss';

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

function MainMenu(): JSX.Element {
  return (
    <nav className={styles.wrapper}>
      <ul className={styles.menu}>
        {menuItemList.map((menuItem) => (
          <li key={menuItem.id}>
            <LinkTo href={menuItem.href}>
              {menuItem.isBrand ? (
                <h3 className={styles.brand}>{menuItem.content}</h3>
              ) : (
                menuItem.content
              )}
            </LinkTo>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export const MemoizedMainMenu = memo(MainMenu);
