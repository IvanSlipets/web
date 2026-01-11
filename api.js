import axios from 'axios';

const BASE_URL = 'http://localhost:5050/api/items'; 



//  * Отримує товари з бекенду (GET)

export const fetchItems = async (params) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: params // Передає фільтри як параметри URL
        });
        return response.data;
    } catch (error) {
        console.error("Помилка при завантаженні товарів:", error);
        throw error;
    }
};


//  * Отримує один товар за ID (GET)

export const fetchItemById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Помилка при завантаженні товару ${id}:`, error);
        throw error;
    }
};






















//  * Створює новий товар (POST)
//  * @param {object} itemData - Дані нового товару.

export const createItem = async (itemData) => {
    try {
        const response = await axios.post(BASE_URL, itemData);
        return response.data;
    } catch (error) {
        console.error("Помилка при створенні товару:", error);
        throw error;
    }
};


//  * Оновлює існуючий товар (PUT)
//  * @param {string} id - ID товару для оновлення.
//  * @param {object} itemData - Оновлені дані товару.

export const updateItem = async (id, itemData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, itemData);
        return response.data;
    } catch (error) {
        console.error(`Помилка при оновленні товару ${id}:`, error);
        throw error;
    }
};


//  * Видаляє товар (DELETE)
//  * @param {string} id - ID товару для видалення.

export const deleteItem = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        return null;
    } catch (error) {
        console.error(`Помилка при видаленні товару ${id}:`, error);
        throw error;
    }
};