import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layoute from './components/Layout';
import ItemPage from './pages/ItemPage';
import BasketPage from './pages/BasketPage';
import InfoPage from './pages/Info';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AuthProvider } from './contex/authContext';
import { UserDataProvider } from './contex/UserDataContex';
import { NotificaionProvider } from './contex/notificationContex';

function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        <NotificaionProvider>
        <Routes>
          <Route element={<Layoute />}>
            <Route path='/' element={<ProductsPage />} />
            <Route path='/login' element={<SignIn />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/item' element={<ItemPage />} />
            <Route path='/item/:id' element={<ItemPage />} />
            <Route path='/info' element={<InfoPage />} />
            <Route path='/basket' element={<BasketPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
          </Route>
        </Routes>
        </NotificaionProvider>
      </UserDataProvider>
    </AuthProvider>
  );
}

export default App;
