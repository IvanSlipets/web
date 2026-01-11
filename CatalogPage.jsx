import { useState, useEffect, useCallback } from 'react';
import HeaderComponent from "./components/layout/header/HeaderComponent";
import FooterComponent from "./components/layout/footer/FooterComponent";
import ProductTile from "./components/product/ProductTile";
import Select from "./components/common/Select";
import PrimaryButton from "./components/common/PrimaryButton";
import Loader from './components/common/Loader'; 
import './CatalogPage.css';
import { Search } from 'lucide-react';
import { fetchItems } from './api';
import { useItems } from './context/ItemContext'; 

const sortOptions = [
    { value: 'none', label: 'Wiyhout sorting' },
    { value: 'price_asc', label: 'Price (ascending)' },
    { value: 'price_desc', label: 'Price (descending)' },
];

const colorOptions = [
    { value: 'Red', label: 'Red' },
    { value: 'Blue', label: 'Blue' },
    { value: 'Green', label: 'Green' },
    { value: 'Black', label: 'Black' },
];

const typeOptions = [
    { value: 'Widget', label: 'Widget' },
    { value: 'Gadget', label: 'Gadget' },
    { value: 'Tool', label: 'Tool' },
];


const CatalogPage = () => {
    const { getItemById } = useItems(); 
    
    const [fetchedItems, setFetchedItems] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [filters, setFilters] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [sortCriteria, setSortCriteria] = useState('none');

    // Функція для завантаження даних
    const loadItems = useCallback(async () => {
        setLoading(true);
        
        const apiParams = {
            ...filters,
            sortCriteria,
            searchQuery,
        };

        try {
            const data = await fetchItems(apiParams);
            
            const itemsWithImagesPromises = data.map(item => getItemById(item.id).then(mappedItem => mappedItem || item));
            
            const resolvedItems = await Promise.all(itemsWithImagesPromises);

            setFetchedItems(resolvedItems);
        } catch (error) {
            console.error("Catalog loading error:", error);
            setFetchedItems([]);
        } finally {
            setLoading(false);
        }
    }, [filters, sortCriteria, searchQuery, getItemById]);

    useEffect(() => {
        loadItems();
    }, [loadItems]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value === "" ? undefined : value
        }));
    };

    const handleSortChange = (value) => {
        setSortCriteria(value);
    };

    const handleReset = () => {
        setFilters({});
        setSearchQuery('');
        setSortCriteria('none');
    };

    return (
        <div className="app-global">
            <HeaderComponent activeTab="catalog" />

            <main className="container" style={{ paddingTop: '20px' }}>
                <h1 className="main-banner-title" style={{ marginBottom: '20px' }}>Catalog</h1>

                <div className="catalog-filters">

                    <div className="search-input-container">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="catalog-search-input"
                        />
                        <Search size={18} color="#999" className="search-icon" />
                    </div>

                    <Select
                        options={colorOptions}
                        placeholder="Filter by Color"
                        onChange={(value) => handleFilterChange('color', value)}
                        value={filters.color || ''}
                    />

                    <Select
                        options={typeOptions}
                        placeholder="Filter by Type"
                        onChange={(value) => handleFilterChange('type', value)}
                        value={filters.type || ''}
                    />

                    <Select
                        options={sortOptions}
                        placeholder="Sort By Price"
                        onChange={handleSortChange}
                        value={sortCriteria}
                    />

                    <PrimaryButton onClick={handleReset}>
                        Reset Filters
                    </PrimaryButton>
                </div>

                {loading ? ( 
                    <Loader />
                ) : (
                    <section className="catalog-products-grid">
                        {fetchedItems.map((product) => (
                            <ProductTile
                                key={product.id}
                                title={product.title}
                                description={product.description}
                                price={product.price}
                                showPrice={true}
                                itemId={product.id}
                                imageUrl={product.imageUrl}
                            />
                        ))}
                    </section>
                )}


                {!loading && fetchedItems.length === 0 && (
                    <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>Немає товарів, що відповідають вашим критеріям.</p>
                )}

            </main>

            <FooterComponent />
        </div>
    );
};

export default CatalogPage;