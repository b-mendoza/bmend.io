import { memo } from 'react';

import { MemoizedMainMenu } from '@/components/Menus/MainMenu';

import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout(props: MainLayoutProps) {
  return (
    <>
      <header className={styles.header}>
        <MemoizedMainMenu />
      </header>

      <main className={styles.content}>{props.children}</main>

      <footer className={styles.footer}>This is the Footer</footer>
    </>
  );
}

export const MemoizedMainLayout = memo(MainLayout);
