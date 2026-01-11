export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';


//  * Додає новий товар до кошика або збільшує його кількість.
//  * @param {object} item - Об'єкт товару
//  * @param {number} quantity - Кількість товару

export const addItemToCart = (item, quantity) => ({
    type: ADD_ITEM_TO_CART,
    payload: { item, quantity },
});


//  * Повністю видаляє товар з кошика.
//  * @param {string} itemId - ID товару для видалення.

export const removeItemFromCart = (itemId) => ({
    type: REMOVE_ITEM_FROM_CART,
    payload: { itemId },
});


//  * Збільшує кількість товару в кошику на 1.
//  * @param {string} itemId - ID товару.

export const incrementQuantity = (itemId) => ({
    type: INCREMENT_QUANTITY,
    payload: { itemId },
});


//  * Зменшує кількість товару в кошику на 1.
//  * @param {string} itemId - ID товару.

export const decrementQuantity = (itemId) => ({
    type: DECREMENT_QUANTITY,
    payload: { itemId },
});