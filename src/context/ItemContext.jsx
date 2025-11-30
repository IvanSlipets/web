import { createContext, useContext, useState } from 'react';

const mockItems = [
    { id: 1, title: "Amazing Widget S-Red", description: "Найкращий віджет з червоної серії, маленький.", price: 2415, color: 'Red', size: 'S', type: 'Widget' },
    { id: 2, title: "Standard Widget M-Blue", description: "Надійний середній віджет, синього кольору.", price: 1500, color: 'Blue', size: 'M', type: 'Widget' },
    { id: 3, title: "Premium Gadget L-Black", description: "Ексклюзивний великий ґаджет, стильний чорний.", price: 5999, color: 'Black', size: 'L', type: 'Gadget' },
    { id: 4, title: "Basic Tool S-Black", description: "Простий інструмент, чорний та компактний.", price: 800, color: 'Black', size: 'S', type: 'Tool' },
    { id: 5, title: "Luxury Widget L-Red", description: "Великий червоний віджет преміумкласу.", price: 4000, color: 'Red', size: 'L', type: 'Widget' },
    { id: 6, title: "Green Gadget M-Green", description: "Екологічний ґаджет середнього розміру.", price: 3200, color: 'Green', size: 'M', type: 'Gadget' },
    { id: 7, title: "Blue Tool L-Blue", description: "Великий синій інструмент.", price: 1200, color: 'Blue', size: 'L', type: 'Tool' },
    { id: 8, title: "Mini Widget S-Green", description: "Маленький зелений віджет для початківців.", price: 950, color: 'Green', size: 'S', type: 'Widget' },
    { id: 9, title: "Max Widget L-Blue", description: "Максимальний синій віджет.", price: 6500, color: 'Blue', size: 'L', type: 'Widget' },
    { id: 10, title: "Small Gadget S-Red", description: "Маленький червоний ґаджет.", price: 2100, color: 'Red', size: 'S', type: 'Gadget' },
    { id: 11, title: "Huge Tool L-Red", description: "Дуже великий червоний інструмент.", price: 1800, color: 'Red', size: 'L', type: 'Tool' },
];

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
    const [items] = useState(mockItems);

    // Функція для пошуку товару за ID
    const getItemById = (id) => {
        return items.find(item => item.id === parseInt(id));
    };

    return (
        <ItemContext.Provider value={{ items, getItemById }}>
            {children}
        </ItemContext.Provider>
    );
};

export const useItems = () => useContext(ItemContext);