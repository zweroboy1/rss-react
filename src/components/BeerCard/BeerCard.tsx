import React from 'react';
import { Beer } from '../../types';
import styles from './BeerCard.module.scss';

interface BeerCardProps {
  beer: Beer;
}

const BeerCard: React.FC<BeerCardProps> = ({ beer }) => {
  return (
    <li className={styles['beer__card']}>
      <div className={styles['beer__image-container']}>
        <img
          src={beer.image}
          alt={beer.title}
          className={styles['beer__image']}
        />
      </div>
      <h2 className={styles['beer__title']}>{beer.title}</h2>
      <p className={styles['beer__description']}>{beer.tag}</p>
    </li>
  );
};

export default BeerCard;
