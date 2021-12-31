import { memo } from 'react';

import { MemoizedFooter } from '@/components/Footer';
import { MemoizedMainMenu } from '@/components/Menus/MainMenu';

import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout(props: MainLayoutProps): JSX.Element {
  return (
    <>
      <header className={styles.header}>
        <MemoizedMainMenu />
      </header>

      <main className={styles.content}>{props.children}</main>

      <MemoizedFooter />
    </>
  );
}

export const MemoizedMainLayout = memo(MainLayout);
