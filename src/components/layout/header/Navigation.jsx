import './Navigation.css';
import { Home, Grid, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = ({ activeTab }) => {
    const navItems = [
        { name: 'Home', icon: Home, path: '/', id: 'home' },
        { name: 'Catalog', icon: Grid, path: '/catalog', id: 'catalog' },
        { name: 'Cart', icon: ShoppingCart, path: '/cart', id: 'cart' },
    ];

    return (
        <nav className="nav-container">
            {navItems.map((item) => (
                <Link className={`nav-button ${item.id === activeTab ? 'nav-active' : ''}`}
                    key={item.name}
                    to={item.path}
                    aria-current={item.id === activeTab ? 'page' : undefined}
                >
                    <item.icon size={16} style={{ marginRight: '5px' }} />
                    {item.name}
                </Link>
            ))}
        </nav>
    );
};

export default Navigation;