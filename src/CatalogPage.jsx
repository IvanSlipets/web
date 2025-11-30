import { useState, useMemo } from 'react';
import HeaderComponent from "./components/layout/header/HeaderComponent";
import FooterComponent from "./components/layout/footer/FooterComponent";
import ProductTile from "./components/product/ProductTile";
import Select from "./components/common/Select";
import PrimaryButton from "./components/common/PrimaryButton";
import './CatalogPage.css';
import { useItems } from './context/ItemContext';
import { Search } from 'lucide-react';

const sortOptions = [
    { value: 'price_asc', label: 'Ціна (зростання)' },
    { value: 'price_desc', label: 'Ціна (спадання)' },
];

const CatalogPage = () => {
    const { items } = useItems();
    const [filters, setFilters] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const [sortCriteria, setSortCriteria] = useState('price_asc');

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value === "" ? undefined : value
        }));
    };

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


    const filteredItems = useMemo(() => {
        // 1. Фільтрація
        let currentItems = items.filter(item => {
            const matchesFilters = Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                return item[key] === value;
            });

            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = !searchQuery ||
                item.title.toLowerCase().includes(searchLower) ||
                item.description.toLowerCase().includes(searchLower) ||
                item.color.toLowerCase().includes(searchLower) ||
                item.type.toLowerCase().includes(searchLower);

            return matchesFilters && matchesSearch;
        });

        if (sortCriteria) {
            currentItems = [...currentItems].sort((a, b) => {
                const [key, order] = sortCriteria.split('_');

                let result = 0;

                if (key === 'price') {
                    result = (a.price || 0) - (b.price || 0);
                }

                return order === 'desc' ? result * -1 : result;
            });
        }

        return currentItems;
    }, [items, filters, searchQuery, sortCriteria]);

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
                        onChange={setSortCriteria}
                        value={sortCriteria}
                    />

                    <PrimaryButton onClick={() => {
                        setFilters({});
                        setSearchQuery('');
                        setSortCriteria('price_asc');
                    }}>
                        Reset Filters
                    </PrimaryButton>
                </div>

                <section className="catalog-products-grid">
                    {filteredItems.map((product) => (
                        <ProductTile
                            key={product.id}
                            title={product.title}
                            description={product.description}
                            price={product.price}
                            showPrice={true}
                            itemId={product.id}
                        />
                    ))}
                </section>

                {filteredItems.length === 0 && (
                    <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>Немає товарів, що відповідають вашим критеріям.</p>
                )}

            </main>

            <FooterComponent />
        </div>
    );
};

export default CatalogPage;