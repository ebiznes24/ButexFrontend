import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layoute from './components/Layout';
import ItemPage from './pages/ItemPage';
import BasketPage from './pages/BasketPage';
import InfoPage from './pages/Info';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <Routes>
      <Route element={<Layoute/>}>
        <Route path='/' element={<ProductsPage/>} />
        <Route path='/item' element={<ItemPage/>} />
        <Route path='/info' element={<InfoPage/>} />
        <Route path='/basket' element={<BasketPage/>} />
        <Route path='/checkout' element={<CheckoutPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
