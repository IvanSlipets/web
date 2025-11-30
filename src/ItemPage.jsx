import { useParams, Link } from 'react-router-dom';
import { useState } from 'react'; 
import HeaderComponent from './components/layout/header/HeaderComponent';
import FooterComponent from './components/layout/footer/FooterComponent';
import PrimaryButton from './components/common/PrimaryButton';
import Select from './components/common/Select';
import { useItems } from './context/ItemContext';
import { ShoppingBag } from 'lucide-react';
import './ItemPage.css';

const ItemPage = () => {
    const { itemId } = useParams();
    const { getItemById } = useItems();
    
    const [quantity, setQuantity] = useState(1); 

    const item = getItemById(itemId);

    const mockSizeOptions = [
        { value: 'S', label: 'Small (S)' },
        { value: 'M', label: 'Medium (M)' },
        { value: 'L', label: 'Large (L)' },
    ];
    
    const itemTags = [
        { label: 'Size', value: item?.size },
        { label: 'Type', value: item?.type },
    ].filter(tag => tag.value);

    if (!item) {
        return (
            <div className="app-global">
                <HeaderComponent />
                <main className="container item-not-found-container">
                    <h1>Товар не знайдено</h1>
                    <Link to="/catalog">
                        <PrimaryButton>Повернутися до Каталогу</PrimaryButton>
                    </Link>
                </main>
                <FooterComponent />
            </div>
        );
    }

    return (
        <div className="app-global">
            <HeaderComponent />
            <main className="container" style={{ paddingTop: '40px' }}>

                <div className="item-page-content">

                    <div className="item-image-placeholder">
                        <ShoppingBag size={80} color="#aaaaaa" />
                    </div>

                    <div>
                        <div className="item-characteristics">
                            {itemTags.map((tag, index) => (
                                <span key={index} className="char-tag">
                                    {tag.label}: {tag.value}
                                </span>
                            ))}
                        </div>
                        
                        <h1 className="item-title">{item.title}</h1>
                        <p className="item-description">{item.description}</p>
                        
                        <div className="item-controls-grid">
                            <div className="control-group">
                                <label className="control-label" htmlFor="quantity-field">Кількість (Countable field)</label>
                                <input 
                                    type="number" 
                                    id="quantity-field"
                                    placeholder="1" 
                                    className="countable-field" 
                                    min="1" 
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                />
                            </div>
                            <div className="control-group">
                                <label className="control-label" htmlFor="size-select">Опція (Selectable Field)</label>
                                <Select 
                                    id="size-select"
                                    options={mockSizeOptions} 
                                    placeholder="Оберіть розмір"
                                    className="selectable-field-override" 
                                />
                            </div>
                        </div>

                        <div className="item-price">
                            Ціна: ${item.price} 
                        </div>

                        <div className="item-action-buttons">
                            <Link to="/catalog">
                                <PrimaryButton className="secondary-button">
                                    &larr; Go back
                                </PrimaryButton>
                            </Link>
                            
                            <PrimaryButton className="item-add-to-cart-button" onClick={() => console.log('Add to cart clicked', item.id, quantity)}>
                                Додати до кошика
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