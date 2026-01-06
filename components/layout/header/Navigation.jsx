import { Link } from 'react-router-dom';
import './Navigation.css';
import { ShoppingBag } from 'lucide-react';

import { useSelector } from 'react-redux';

const Navigation = ({ activeTab }) => {
    // Отримуємо загальну кількість товарів з Redux Store
    const totalQuantity = useSelector(state => state.cart.totalQuantity); 

    const getClassName = (tab) => 
        `nav-button ${activeTab === tab ? 'nav-active' : ''}`;

    return (
        <nav>
            <Link to="/" className={getClassName('home')}>
                Home
            </Link>
            <Link to="/catalog" className={getClassName('catalog')}>
                Catalog
            </Link>
            
            <Link to="/cart" className={getClassName('cart')} style={{ position: 'relative' }}>
                <ShoppingBag size={20} />
                {totalQuantity > 0 && (
                    <span 
                        style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            backgroundColor: 'red',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '1px 6px',
                            fontSize: '12px',
                            lineHeight: '1',
                        }}
                    >
                        {totalQuantity}
                    </span>
                )}
                Cart
            </Link>
        </nav>
    );
};

export default Navigation;