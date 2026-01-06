import { Users } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import PrimaryButton from '../common/PrimaryButton'; 
import "./ProductTile.css";

const ProductTile = ({ title, description, price, showPrice, itemId, imageUrl }) => ( 
    <div className="tile-card"> 
        <div className="tile-image-placeholder">
            {imageUrl ? (
                <img src={imageUrl} alt={title} className="tile-image" />
            ) : (
                // Заглушка, якщо imageUrl не надано
                <Users size={40} color="#aaaaaa" />
            )}
        </div>

        <h5 className="tile-title">{title}</h5>
        <p className="tile-description">{description}</p>
        
        {showPrice && price && (
            <div className="tile-price-container">
                <span className="tile-price-label">Ціна:</span>
                <span className="tile-price-value">$ {price}</span>
            </div>
        )}
        
        <Link to={`/item/${itemId}`} className="tile-view-link"> 
            <PrimaryButton> 
                View more
            </PrimaryButton>
        </Link>
    </div>
);

export default ProductTile;