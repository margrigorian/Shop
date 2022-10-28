import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        massimoProducts: [
            {
                id: 1,
                title: 'SUEDE COAT WITH SHIRT COLLAR',
                src: "https://img01.ztat.net/article/spp-media-p1/43cbbf5a955943a3acb8ca1a42f99b01/d8f639d724404257a74dfc75c81264b3.jpg",
                // url: "../../pictures/Massimo-Dutti-summer.jpg",
                count: 10,
                maxCount: 10,
                price: 199900.00
            },
            {
                id: 2,
                title: 'COAT WITH TOGGLE BUTTON',
                src: "https://i.pinimg.com/originals/a8/31/b8/a831b8e878fe66b91da2f6e0f2456ee1.jpg",
                count: 6,
                maxCount: 6,
                price: 139900.00
            },
            {
                id: 3,
                title: 'TRENCH COAT WITH BELT',
                src: "https://img01.ztat.net/article/spp-media-p1/3dbba5ffe3b74e3c8c230d28e213d821/386756e8a3b14f6293d9e57c598e5cd5.jpg?imwidth=762",
                count: 8,
                maxCount: 8,
                price: 99900.00
            },
            {
                id: 4,
                title: 'TRENCH COAT WITH BELT',
                src: "https://img01.ztat.net/article/spp-media-p1/4816dc55b2c84d3e93ddc0841e545091/63e4c1b9e5264759b59d5aa2d48e17e2.jpg?imwidth=762",
                count: 10,
                maxCount: 10,
                price: 69900.00
            }
        ]
    },
    reducers: {
        add: (state, action) => {
            const currentProduct = state.massimoProducts.find(item => item.id === action.payload);

            if(currentProduct.count === currentProduct.maxCount) {
                currentProduct.count -= 1;
            }
        },
        changeCount: (state, action) => {
            const currentProduct = state.massimoProducts.find(item => item.id === action.payload.id);
            currentProduct.count = currentProduct.maxCount - +action.payload.count;
        }
    }
})

export default productsSlice.reducer;

export const {add, changeCount} = productsSlice.actions;

export const selectProducts = (state) => state.products; // .products с ссылкой на store и только после на products из initialState