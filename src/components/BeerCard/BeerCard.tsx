import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Beer } from '../../types';

import styles from './BeerCard.module.scss';

interface BeerCardProps {
  beer: Beer;
}

const BeerCard: React.FC<BeerCardProps> = ({ beer }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <li className={styles['beer__card']}>
      <div
        role="card"
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          navigate('/item/' + beer.id + location.search);
          event.stopPropagation();
        }}
        className={styles['beer__link']}
      >
        <div className={styles['beer__image-container']}>
          <img
            src={beer.image}
            alt={beer.title}
            className={styles['beer__image']}
          />
        </div>
        <h2 className={styles['beer__title']}>{beer.title}</h2>
        <p className={styles['beer__description']}>{beer.tag}</p>
      </div>
    </li>
  );
};

export default BeerCard;
