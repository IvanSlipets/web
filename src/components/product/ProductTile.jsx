import { Users } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import PrimaryButton from '../common/PrimaryButton'; 
import "./ProductTile.css";

const ProductTile = ({ title, description, price, showPrice, itemId }) => ( 
    <div className="tile-card"> 
        <div className="tile-image-placeholder">
            <Users size={40} color="#aaaaaa" />
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
            <PrimaryButton /*className="tile-view-button"*/> 
                Дивитись більше
            </PrimaryButton>
        </Link>
    </div>
);

export default ProductTile;