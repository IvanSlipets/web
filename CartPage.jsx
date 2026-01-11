import HeaderComponent from './components/layout/header/HeaderComponent';
import FooterComponent from './components/layout/footer/FooterComponent';
import PrimaryButton from './components/common/PrimaryButton';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItemFromCart } from './redux/cartActions';
import { Trash2, Plus, Minus } from 'lucide-react';
import './CartPage.css';


// Компонент для відображення одного товару в кошику
const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const { itemData, quantity } = item;

    return (
        <div className="cart-item">
            <Link to={`/item/${itemData.id}`} className="cart-item-image-link">
                <div className="cart-item-image-placeholder">
                    <img src={itemData.imageUrl} alt={itemData.title} className="cart-item-image" />
                </div>
            </Link>
            <div className="cart-item-info">
                <Link to={`/item/${itemData.id}`} className="cart-item-title">{itemData.title}</Link>
                <p className="cart-item-price">Price: ${itemData.price}</p>
                <p className="cart-item-subtotal">Subtotal: ${(itemData.price * quantity).toFixed(2)}</p>

                <div className="cart-item-controls">
                    <div className="quantity-control">
                        <PrimaryButton
                            className="quantity-btn"
                            onClick={() => dispatch(decrementQuantity(itemData.id))}
                            aria-label="Зменшити кількість"
                        >
                            <Minus size={16} />
                        </PrimaryButton>
                        <span className="quantity-value">{quantity}</span>
                        <PrimaryButton
                            className="quantity-btn"
                            onClick={() => dispatch(incrementQuantity(itemData.id))}
                            aria-label="Збільшити кількість"
                        >
                            <Plus size={16} />
                        </PrimaryButton>
                    </div>

                    <PrimaryButton
                        className="remove-btn"
                        onClick={() => dispatch(removeItemFromCart(itemData.id))}
                        aria-label="Видалити товар"
                    >
                        <Trash2 size={16} />
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};


const CartPage = () => {
    // useSelector для отримання стану кошика
    const { items, totalQuantity, totalPrice } = useSelector(state => state.cart);

    // Перетворюємо об'єкт товарів у масив для рендерингу
    const cartItemsArray = Object.values(items);

    return (
        <div className="app-global">
            <HeaderComponent activeTab="cart" />

            <main className="container cart-page-container">
                <h1>Your cart ({totalQuantity} {totalQuantity === 1 ? 'товар' : 'товарів'})</h1>

                {cartItemsArray.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty.</p>
                        <Link to="/catalog">
                            <PrimaryButton>Catalog</PrimaryButton>
                        </Link>
                    </div>
                ) : (
                    <div className="cart-content-grid">
                        <div className="cart-items-list">
                            {cartItemsArray.map(item => (
                                <CartItem key={item.itemData.id} item={item} />
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h2>Count</h2>
                            <div className="summary-line">
                                <span>Quantity:</span>
                                <span>{totalQuantity}</span>
                            </div>
                            <div className="summary-line total-price">
                                <span>Total price:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <Link to="/checkout">
                                <PrimaryButton>
                                    Order
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>
                )}
            </main>

            <FooterComponent />
        </div>
    );
};

export default CartPage;