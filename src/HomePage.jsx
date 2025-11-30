import { useState } from 'react';
import HeaderComponent from './components/layout/header/HeaderComponent';
import MainBanner from './components/product/MainBanner';
import ProductTile from './components/product/ProductTile';
import FooterComponent from './components/layout/footer/FooterComponent';
import PrimaryButton from './components/common/PrimaryButton';
import './HomePage.css';
import { useItems } from './context/ItemContext';


const HomePage = () => {
    const { items } = useItems();
    const [visibleCount, setVisibleCount] = useState(3);
    const tileDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis, dui, non pulvinar lorem felis nec erat.";

    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 3);
    };

    const homePageItems = items.slice(0, visibleCount);
    const isMaxItemsVisible = visibleCount >= items.length;

    return (
        <div className="app-global">
            <HeaderComponent activeTab="home" />

            <main className="container">

                <MainBanner />

                <section className="tile-section"> {/* ВИПРАВЛЕНО: tileSection -> tile-section */}
                    {homePageItems.map((item) => (
                        <ProductTile
                            key={item.id}
                            title={item.title}
                            description={tileDescription}
                            itemId={item.id}
                        />
                    ))}
                </section>

                {!isMaxItemsVisible && (
                    <div className="view-more-button-container">
                        <PrimaryButton className="view-more-button" onClick={loadMore}> {/* ВИПРАВЛЕНО: viewMoreButton -> view-more-button */}
                            Дивитись більше
                        </PrimaryButton>
                    </div>
                )}

            </main>

            <FooterComponent />
        </div>
    );
};

export default HomePage;