import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ReactElement } from 'react';

class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html>
        <Head>
          {/* Добавьте сюда метатеги, ссылки на шрифты и другие ресурсы */}
          <meta name="description" content="Ваше описание приложения" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main /> {/* Основной контент страниц */}
          <NextScript /> {/* Скрипты Next.js */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
