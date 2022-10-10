import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        basket: {
            products: [],
            count: 0,
            totalCost: 0
        }
    },
    reducers: {
        add: (state, action) => {
            const currentProduct = state.basket.products.find(item => item.id === action.payload.id);

            if(currentProduct === undefined) {
                state.basket.products.push({...action.payload, added: 1})
            }

            // console.log(state.basket.products.length);
        },
        changeCount: (state, action) => {

        }
    }
})

export default basketSlice.reducer;

export const {add: addToBasket, changeCount: changeProductCountInBasket} = basketSlice.actions;

export const selectBasket = (state) => state.basket;

