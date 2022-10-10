import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/slice-products";
import basketSlice from "./slices/slice-basket";

const store = configureStore({
    reducer: {
        products: productsSlice,
        basket: basketSlice
    }
})

export default store;