import 'normalize.css';
import '@/styles/globals.scss';

import type { AppProps } from 'next/app';

import { MemoizedMainLayout } from '@/components/Layouts/MainLayout';
import { DefaultSEO } from '@/components/SEO/DefaultSEO';

import { CustomPageProps as CPP } from '@/typings/shared';

interface __AppProps extends AppProps<CPP> {
  pageProps: CPP;
}

export default function _App(props: __AppProps): JSX.Element {
  return (
    <>
      <DefaultSEO />

      <MemoizedMainLayout>
        <props.Component {...props.pageProps} />
      </MemoizedMainLayout>
    </>
  );
}
