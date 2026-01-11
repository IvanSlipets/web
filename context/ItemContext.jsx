import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchItems, fetchItemById } from '../api';

import rs6 from "../components/images/rs6.jpg";
import demon_170 from "../components/images/demon_170.jpg";
import Hoonicorn from "../components/images/Hoonicorn.jpg";
import rx7 from "../components/images/rx7.jpg";
import s1 from "../components/images/s1.jpg";
import trx from "../components/images/trx.jpg";
import lfa from "../components/images/lfa.jpg";
import viper from "../components/images/viper.jpg";
import supra from "../components/images/supra.jpg";
import rezvani from "../components/images/rezvani.jpg";
import pishkarus from "../components/images/pishkarus.jpg";

const IMAGE_MAP = {
    'rs6.jpg': rs6,
    'demon_170.jpg': demon_170,
    'Hoonicorn.jpg': Hoonicorn,
    'rx7.jpg': rx7,
    's1.jpg': s1,
    'trx.jpg': trx,
    'lfa.jpg': lfa,
    'viper.jpg': viper,
    'supra.jpg': supra,
    'rezvani.jpg': rezvani,
    'pishkarus.jpg': pishkarus,
};

const mapItemImage = (item) => {
    if (item && item.imageUrl && IMAGE_MAP[item.imageUrl]) {
        return { ...item, imageUrl: IMAGE_MAP[item.imageUrl] };
    }
    return item;
};


export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadItems = async () => {
            setLoading(true);
            try {
                // Отримуємо дані з бекенду
                const rawData = await fetchItems(); 
                
                // Мапінг для локальних зображень
                const mappedData = rawData.map(mapItemImage); 
                
                setItems(mappedData);
            } catch (error) {
                console.error("Помилка завантаження товарів:", error);
                setItems([]);
            }
            setLoading(false);
        };
        loadItems();
    }, []);

    const getItemById = useCallback(async (id) => {
        try {
            const item = await fetchItemById(id);
            return mapItemImage(item); 
        } catch (error) {
            return null;
        }
    }, []);

    return (
        <ItemContext.Provider value={{ items, loading, getItemById }}> 
            {children}
        </ItemContext.Provider>
    );
};

export const useItems = () => useContext(ItemContext);