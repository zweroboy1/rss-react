import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Beer } from '../../types';
import { BLUR_IMAGE } from '@/constants/blur';

import styles from './BeerBottle.module.scss';

const BeerBottle = ({ beer }: { beer?: Beer }) => {
  const router = useRouter();
  const { pathname, query } = router;

  const closeItemDetails = () => {
    delete query.details;
    router.push({
      pathname,
      query,
    });
  };

  if (!beer) {
    return null;
  }
  return (
    <div className={styles['beer-bottle']}>
      <button
        className={styles['beer-bottle__button']}
        role="button"
        onClick={closeItemDetails}
      >
        close
      </button>
      <div className={styles['beer-bottle__title']}>{beer.title}</div>

      <div className={styles['beer-bottle__image-container']}>
        <Image
          className={styles['beer-bottle__image']}
          src={beer.image}
          alt={beer.title}
          width={400}
          height={500}
          placeholder="blur"
          priority={false}
          blurDataURL={BLUR_IMAGE}
        />
      </div>
      <div className={styles['beer-bottle__text']}>{beer.description}</div>
    </div>
  );
};

export default BeerBottle;
