import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import { BeerBottle } from '../components/BeerBottle';
import { NotFound } from '../components/NotFound';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/item/:productId" element={<BeerBottle />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export { AppRouter };
