import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        token: "",
        basket: {
            products: []
            // count: 0,
            // totalCost: 0
        }
    },
    reducers: {
        getToken: (state, action) => {
            state.token = action.payload.userToken;
        },
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
        addCommentToProduct: (state, action) => {
            const comment = JSON.parse(action.payload.review);

            state.basket.products = state.basket.products.map(item => {
                if(item.id === action.payload.id && item.comments === undefined) {
                    return {...item, comments: [comment]};
                }else if(item.id === action.payload.id && item.comments !== undefined) {
                    const comments = [...item.comments, comment];
                    return item = {...item, comments};
                }else {
                    return item;
                }
            })
        },
        remove: (state, action) => {
            state.basket.products = state.basket.products.filter(item => item.id !== action.payload);
        }
    }
})

export default basketSlice.reducer;

export const {getToken, add: addToBasket, changeCount: changeProductCountInBasket, addCommentToProduct, remove} = basketSlice.actions;

export const selectBasket = (state) => state.basket;

