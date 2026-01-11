import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import HeaderComponent from './components/layout/header/HeaderComponent';
import FooterComponent from './components/layout/footer/FooterComponent';
import PrimaryButton from './components/common/PrimaryButton';
import Select from './components/common/Select';
import Loader from './components/common/Loader'; 
import { useItems } from './context/ItemContext';
import { ShoppingBag } from 'lucide-react';
import './ItemPage.css';

import { useDispatch } from 'react-redux';
import { addItemToCart } from './redux/cartActions';

const mockSizeOptions = [
    { value: 'S', label: 'Small (S)' },
    { value: 'M', label: 'Medium (M)' },
    { value: 'L', label: 'Large (L)' },
    { value: 'XL', label: 'Extra Large (XL)' },
];

const ItemPage = () => {
    const { itemId } = useParams();
    const { getItemById } = useItems(); 
    
    // Хук для відправки Redux-дій
    const dispatch = useDispatch(); 

    const [quantity, setQuantity] = useState(1);
    const [item, setItem] = useState(null); 
    const [loading, setLoading] = useState(true); 

    // Логіка завантаження товару
    useEffect(() => {
        const loadItem = async () => {
            setLoading(true);
            try {
                const fetchedItem = await getItemById(itemId); 
                setItem(fetchedItem);
            } catch (error) {
                console.error("Failed to fetch item:", error);
                setItem(null);
            } finally {
                setLoading(false);
            }
        };

        loadItem();
    }, [itemId, getItemById]);

    // Обробник додавання товару в кошик
    const handleAddToCart = () => {
        if (item && quantity > 0) {
            // Відправляємо Redux дію: товар та обрана кількість
            dispatch(addItemToCart(item, quantity));
            alert(`${quantity} x ${item.title} додано до кошика!`);
            setQuantity(1); // Скидаємо кількість до 1 після додавання
        }
    };

    const itemTags = item ? [
        { label: `Color: ${item.color}`, key: 'color' },
        { label: `Type: ${item.type}`, key: 'type' },
        { label: `Size: ${item.size}`, key: 'size' },
    ] : [];

    if (loading) {
        return (
            <div className="app-global">
                <HeaderComponent />
                <main className="container" style={{ paddingTop: '50px' }}>
                    <Loader text={`Завантаження товару ID: ${itemId}...`} />
                </main>
                <FooterComponent />
            </div>
        );
    }
    
    // Якщо товар не знайдено
    if (!item) {
        return (
            <div className="app-global">
                <HeaderComponent />
                <main className="container item-not-found-container">
                    <h1>404</h1>
                    <p>Item with ID: {itemId} not found.</p>
                    <Link to="/catalog">
                        <PrimaryButton>&larr; Catalog </PrimaryButton>
                    </Link>
                </main>
                <FooterComponent />
            </div>
        );
    }

    return (
        <div className="app-global">
            <HeaderComponent activeTab="none" /> 
            <main className="container item-page-container">
                <div className="item-page-content">
                    
                    <div className="item-image-placeholder">
                        <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="item-main-image" 
                        />
                    </div>
                    
                    <div className="item-info-block">
                        <h1>{item.title}</h1>
                        
                        <div className="item-characteristics">
                            {itemTags.map(tag => (
                                <span key={tag.key} className="char-tag">
                                    {tag.label}
                                </span>
                            ))}
                        </div>

                        <p className="item-description">{item.description}</p>
                        
                        <div className="item-controls-grid">
                            <div className="control-group">
                                <label className="control-label" htmlFor="quantity-input">Quantity</label>
                                <input
                                    id="quantity-input"
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="countable-field"
                                />
                            </div>
                            
                            <div className="control-group">
                                <label className="control-label" htmlFor="size-select">Size</label>
                                <Select
                                    id="size-select"
                                    options={mockSizeOptions}
                                    placeholder="Оберіть розмір"
                                    className="selectable-field-override"
                                />
                            </div>
                        </div>

                        <div className="item-price">
                            Price: ${item.price}
                        </div>

                        <div className="item-action-buttons">
                            <Link to="/catalog">
                                <PrimaryButton className="secondary-button">
                                    &larr; Go back
                                </PrimaryButton>
                            </Link>

                            <PrimaryButton 
                                className="item-add-to-cart-button" 
                                onClick={handleAddToCart}
                            >
                                <ShoppingBag size={20} style={{ marginRight: '8px' }} />
                                Add to cart
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </main>
            <FooterComponent />
        </div>
    );
};

export default ItemPage;