import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ItemProvider } from './context/ItemContext';
import HomePage from './HomePage';
import CatalogPage from './CatalogPage';
import ItemPage from './ItemPage';

const App = () => {
    return (
        <Router>
            <ItemProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/item/:itemId" element={<ItemPage />} />
                </Routes>
            </ItemProvider>
        </Router>
    );
};

export default App;