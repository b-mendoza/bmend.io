import 'normalize.css';

import '@fontsource/fira-code/600.css';
import '@fontsource/fira-code/variable.css';

import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/variable.css';

import type { AppProps } from 'next/app';

import { MainLayout } from 'components/Layouts/MainLayout';
import { DefaultHead } from 'components/SEO/DefaultHead';

import { globalStyles } from 'styles/globals';

export default function _App(props: AppProps): JSX.Element {
  return (
    <>
      {globalStyles}

      <DefaultHead />

      <MainLayout>
        <props.Component {...props.pageProps} />
      </MainLayout>
    </>
  );
}
