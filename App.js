import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ItemProvider } from './context/ItemContext';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomePage from './HomePage';
import CatalogPage from './CatalogPage';
import ItemPage from './ItemPage';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';
import SuccessPage from './SuccessPage';

import { Navigate } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';

const App = () => {
    const isAuthenticated = () => !!localStorage.getItem('userEmail');

    return (
        <Provider store={store}>
            <Router>
                <ItemProvider>
                    <Routes>
                        {/* Якщо юзер залогінений, редіректимо з логіну на головну */}
                        <Route path="/login" element={isAuthenticated() ? <Navigate to="/" /> : <LoginPage />} />
                        <Route path="/register" element={isAuthenticated() ? <Navigate to="/" /> : <RegistrationPage />} />

                        {/* Захищені маршрути */}
                        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                        <Route path="/catalog" element={<ProtectedRoute><CatalogPage /></ProtectedRoute>} />
                        <Route path="/item/:itemId" element={<ProtectedRoute><ItemPage /></ProtectedRoute>} />
                        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                        <Route path="/success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
                    </Routes>
                </ItemProvider>
            </Router>
        </Provider>
    );
};

export default App;