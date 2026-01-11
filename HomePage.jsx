import { useState } from 'react';
import HeaderComponent from './components/layout/header/HeaderComponent';
import MainBanner from './components/product/MainBanner';
import ProductTile from './components/product/ProductTile';
import FooterComponent from './components/layout/footer/FooterComponent';
import PrimaryButton from './components/common/PrimaryButton';
import './HomePage.css';
import { useItems } from './context/ItemContext';
import Loader from './components/common/Loader';


const HomePage = () => {
    const { items, loading } = useItems(); 
    const [visibleCount, setVisibleCount] = useState(3);
    // const tileDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis, dui, non pulvinar lorem felis nec erat.";

    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 3);
    };

    const homePageItems = items.slice(0, visibleCount);
    const isMaxItemsVisible = visibleCount >= items.length;

    if (loading) {
        return (
            <div className="app-global">
                <HeaderComponent activeTab="home" />
                <main className="container" style={{ paddingTop: '50px' }}>
                    <Loader text="Завантаження головної сторінки..." />
                </main>
                <FooterComponent />
            </div>
        );
    }
    
    return (
        <div className="app-global">
            <HeaderComponent activeTab="home" />

            <main className="container">

                <MainBanner />

                <section className="tile-section">
                    {homePageItems.map((item) => (
                        <ProductTile
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            itemId={item.id}
                            imageUrl={item.imageUrl}
                        />
                    ))}
                </section>

                {!isMaxItemsVisible && (
                    <div className="view-more-button-container">
                        <PrimaryButton className="view-more-button" onClick={loadMore}>
                            View more
                        </PrimaryButton>
                    </div>
                )}

            </main>

            <FooterComponent />
        </div>
    );
};

export default HomePage;