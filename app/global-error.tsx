/* eslint-disable jsx-a11y/html-has-lang */

'use client';

import { ErrorComponent } from '@components/ErrorComponent/ErrorComponent';
import React from 'react';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  React.useEffect(() => {
    console.error('LOG: This error was caught by Error Boundary', error);
  }, [error]);

  return (
    <html>
      <body>
        <ErrorComponent />;
      </body>
    </html>
  );
}
