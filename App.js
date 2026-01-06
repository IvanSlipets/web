import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ItemProvider } from './context/ItemContext';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import HomePage from './HomePage';
import CatalogPage from './CatalogPage';
import ItemPage from './ItemPage';
import CartPage from './CartPage';

const App = () => {
    return (
        <Provider store={store}> 
            <Router>
                <ItemProvider>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/catalog" element={<CatalogPage />} />
                        <Route path="/item/:itemId" element={<ItemPage />} />
                        <Route path="/cart" element={<CartPage />} />
                    </Routes>
                </ItemProvider>
            </Router>
        </Provider>
    );
};

export default App;