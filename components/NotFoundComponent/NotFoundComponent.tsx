import Image from 'next/image';
import Link from 'next/link';
import styles from './notFoundComponent.module.scss';

export default function NotFoundComponent() {
  return (
    <div className={styles.notFound}>
      <Image className={styles.notFoundImage} src="/images/404.png" alt="Icon Not Found" width={800} height={700} />
      <Link className={styles.notFoundLink} href="/">
        Back to Home page
      </Link>
    </div>
  );
}
