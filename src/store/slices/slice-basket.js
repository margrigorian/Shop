import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        basket: {
            products: []
            // count: 0,
            // totalCost: 0
        }
    },
    reducers: {
        add: (state, action) => {
            const newProduct = state.basket.products.find(item => item.id === action.payload.id);

            if(newProduct === undefined) {
                // state.basket.products.push({...action.payload, added: 1})
                state.basket.products.push({...action.payload})

                // ЧТОБЫ НЕ ДЕЛАТЬ ЛИШНИХ КЛЮЧЕЙ (added)
                const currentProduct = state.basket.products.find(item => item.id === action.payload.id);
                // СРАЗУ ПОМЕНЯТЬ COUNT В ACTION.PAYLOAD НЕЛЬЗЯ
                currentProduct.count = 1; 
            }
        },
        changeCount: (state, action) => {
            const currentProduct = state.basket.products.find(item => item.id === action.payload.id);
            currentProduct.count = +action.payload.count; 
        },
        remove: (state, action) => {
            state.basket.products = state.basket.products.filter(item => item.id !== action.payload);
        }
    }
})

export default basketSlice.reducer;

export const {add: addToBasket, changeCount: changeProductCountInBasket, remove} = basketSlice.actions;

export const selectBasket = (state) => state.basket;

