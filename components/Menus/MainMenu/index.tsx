import Link from 'next/link';
import { memo } from 'react';
import { v4 as uuid4 } from 'uuid';

import styles from './MainMenu.module.scss';

interface MenuItem {
  href: string;
  id: string;
  isBrand: boolean;
  content: string;
}

const menuItemList: MenuItem[] = [
  { href: '/', id: uuid4(), isBrand: true, content: 'bMend_' },
  { href: '/', id: uuid4(), isBrand: false, content: 'Home' },
];

function MainMenu() {
  return (
    <nav className={styles.wrapper}>
      <ul className={styles.menu}>
        {menuItemList.map((menuItem) => (
          <li key={menuItem.id}>
            <Link href={menuItem.href}>
              <a>
                {menuItem.isBrand ? (
                  <h3 className={styles.menuTitle}>{menuItem.content}</h3>
                ) : (
                  menuItem.content
                )}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export const MemoizedMainMenu = memo(MainMenu);
