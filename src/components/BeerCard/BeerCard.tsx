import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Beer } from '../../types';
import { BLUR_IMAGE } from '@/constants/blur';

import styles from './BeerCard.module.scss';

interface BeerCardProps {
  beer: Beer;
}

const BeerCard: React.FC<BeerCardProps> = ({ beer }) => {
  const router = useRouter();
  const { pathname, query } = router;

  const openItemDetails = (id: number) => {
    router.push({
      pathname,
      query: { ...query, details: id },
    });
  };

  return (
    <li
      className={styles['beer__card']}
      key={beer.id}
      role="listitem"
      onClick={(event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        openItemDetails(beer.id);
        event.stopPropagation();
      }}
    >
      <div className={styles['beer__link']} role="card">
        <div className={styles['beer__image-container']}>
          <Image
            className={styles['beer__image']}
            src={beer.image}
            alt={beer.title}
            width={100}
            height={200}
            placeholder="blur"
            priority={false}
            blurDataURL={BLUR_IMAGE}
          />
        </div>
        <h2 className={styles['beer__title']}>{beer.title}</h2>
        <p className={styles['beer__description']}>{beer.tag}</p>
      </div>
    </li>
  );
};

export default BeerCard;
