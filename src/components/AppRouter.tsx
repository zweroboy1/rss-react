import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import { BeerBottle } from '../components/BeerBottle';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/item/:productId" element={<BeerBottle />} />
      </Route>
    </Routes>
  );
};

export { AppRouter };
