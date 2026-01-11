import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    INCREMENT_QUANTITY,
    DECREMENT_QUANTITY
} from './cartActions';

const initialState = {
    items: {},
    totalQuantity: 0,
    totalPrice: 0,
};

// Допоміжна функція для перерахунку загальної кількості та ціни
const updateCartTotals = (items) => {
    let totalQuantity = 0;
    let totalPrice = 0;

    Object.values(items).forEach(cartItem => {
        totalQuantity += cartItem.quantity;
        totalPrice += cartItem.itemData.price * cartItem.quantity;
    });

    return { totalQuantity, totalPrice };
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_ITEM_TO_CART: {
            const { item, quantity } = action.payload;
            const existingItem = state.items[item.id];
            let newItems;

            if (existingItem) {
                // Товар вже є, збільшуємо кількість
                newItems = {
                    ...state.items,
                    [item.id]: {
                        ...existingItem,
                        quantity: existingItem.quantity + quantity,
                    },
                };
            } else {
                // Товар новий, додаємо
                newItems = {
                    ...state.items,
                    [item.id]: {
                        itemData: item,
                        quantity,
                    },
                };
            }
            return {
                ...state,
                items: newItems,
                ...updateCartTotals(newItems),
            };
        }

        case REMOVE_ITEM_FROM_CART: {
            const { itemId } = action.payload;
            const newItems = { ...state.items };
            delete newItems[itemId];

            return {
                ...state,
                items: newItems,
                ...updateCartTotals(newItems),
            };
        }

        case INCREMENT_QUANTITY: {
            const { itemId } = action.payload;
            const existingItem = state.items[itemId];

            if (!existingItem) return state;

            const newItems = {
                ...state.items,
                [itemId]: {
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                },
            };
            return {
                ...state,
                items: newItems,
                ...updateCartTotals(newItems),
            };
        }

        case DECREMENT_QUANTITY: {
            const { itemId } = action.payload;
            const existingItem = state.items[itemId];

            if (!existingItem) return state;

            // Якщо кількість > 1, зменшуємо, інакше видаляємо
            if (existingItem.quantity > 1) {
                const newItems = {
                    ...state.items,
                    [itemId]: {
                        ...existingItem,
                        quantity: existingItem.quantity - 1,
                    },
                };
                return {
                    ...state,
                    items: newItems,
                    ...updateCartTotals(newItems),
                };
            } else {
                // Якщо зменшуємо до 0 (видаляємо товар)
                const newItems = { ...state.items };
                delete newItems[itemId];
                return {
                    ...state,
                    items: newItems,
                    ...updateCartTotals(newItems),
                };
            }
        }

        default:
            return state;
    }
};