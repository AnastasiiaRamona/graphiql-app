'use client';

import { Button, Link } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './notFound.module.css';
import notFoundImageSrc from '../../assets/404.webp';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

function Star({ top, right }: { top: number; right: number }) {
  const [position, setPosition] = useState(right);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition((prev) =>
        prev >= window.innerWidth ? window.innerWidth + 100 : prev + 3
      );
    }, 10);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={styles.star}
      style={{ top: `${top}px`, right: `${position}px` }}
    />
  );
}

function NotFound() {
  const locale = useTranslations();
  const [stars, setStars] = useState<Array<{ top: number; right: number }>>([]);
  const params = useParams();
  const localeUrl = params.locale || 'en';

  useEffect(() => {
    const createStar = () => {
      const top = Math.random() * window.innerHeight;
      const right = Math.random() * 300;
      setStars((prevStars) => [...prevStars, { top, right }]);
    };

    const intervalId = setInterval(createStar, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.text}>
          <div>{locale('error')}</div>
          <h1>404</h1>
          <hr />
          <div>{locale('pageNotFound')}</div>
          <Link href={`/${localeUrl}/welcome`}>
            <Button>{locale('goHome')}</Button>
          </Link>
        </div>
        <div className={styles.astronaut}>
          <Image
            src={notFoundImageSrc}
            alt="Astronaut"
            style={{ width: 'auto', height: '40%' }}
            priority={true}
          />
        </div>
        {stars.map((star, index) => (
          <Star key={index} top={star.top} right={star.right} />
        ))}
      </div>
    </div>
  );
}

export default NotFound;
