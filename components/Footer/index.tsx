import { memo } from 'react';
import { v4 as uuid4 } from 'uuid';

import { LinkTo } from 'components/Customs/LinkTo';

import styles from './Footer.module.scss';

interface MenuItem {
  content: string;
  href: string;
  id: string;
}

const menuItemList: MenuItem[] = [{ content: 'Home', href: '/', id: uuid4() }];

function Footer(): JSX.Element {
  return (
    <footer className={styles.container}>
      <LinkTo href="/">
        <h4 className={styles.brand}>bMend_</h4>
      </LinkTo>

      <p className={styles.tagLine}>Made with ❤️ by bMend_</p>

      <nav>
        <ul>
          {menuItemList.map((menuItem) => (
            <li key={menuItem.id}>
              <LinkTo href={menuItem.href}>{menuItem.content}</LinkTo>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}

export const MemoizedFooter = memo(Footer);
