export const PRODUCTS_API_HOST = "https://shop-api.aitschool.am";

export const tokenLink = `${PRODUCTS_API_HOST}/auth/login`;
export const popProductsLink = `${PRODUCTS_API_HOST}/products/home`;
export const currentProductLink = (value) => `${PRODUCTS_API_HOST}/products/current/${value}`;
// export const searchProductLink = (value) => `${PRODUCTS_API_HOST}/products/...${value}`;
export const addRemoveProductLink = `${PRODUCTS_API_HOST}/basket`;
export const updateCountLink = `${PRODUCTS_API_HOST}/basket/update_count`;
export const addCommentLink = `${PRODUCTS_API_HOST}/products/comment`;
export const rateLink = `${PRODUCTS_API_HOST}/products/react`;
export const purchaseLink = `${PRODUCTS_API_HOST}/basket/purchase`;