import 'normalize.css';

import type { AppProps } from 'next/app';

import { CustomPageProps as CPP } from '@/typings/shared';

interface NextApp extends AppProps<CPP> {
  pageProps: CPP;
}

export default function NextApp(props: NextApp) {
  return <props.Component {...props.pageProps} />;
}
