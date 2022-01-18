import Document, { Head, Html, Main, NextScript } from 'next/document';

class _Document extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _Document;
