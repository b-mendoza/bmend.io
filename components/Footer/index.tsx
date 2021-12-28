import Link from 'next/link';
import { memo } from 'react';
import { v4 as uuid4 } from 'uuid';

import styles from './Footer.module.scss';

interface MenuItem {
  content: string;
  href: string;
  id: string;
}

const menuItemList: MenuItem[] = [{ content: 'Home', href: '/', id: uuid4() }];

function Footer() {
  return (
    <footer className={styles.container}>
      <Link href="/">
        <a>
          <h4 className={styles.brand}>bMend_</h4>
        </a>
      </Link>

      <p className={styles.tagLine}>Made with ❤️ by bMend_</p>

      <nav>
        <ul>
          {menuItemList.map((menuItem) => (
            <li key={menuItem.id}>
              <Link href={menuItem.href}>
                <a>{menuItem.content}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}

export const MemoizedFooter = memo(Footer);
