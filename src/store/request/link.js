export const PRODUCTS_API_HOST = "https://shop-api.aitschool.am";

export const tokenLink = `${PRODUCTS_API_HOST}/auth/login`;
export const popProductsLink = `${PRODUCTS_API_HOST}/products/home`;
export const currentProductLink = (value) => `${PRODUCTS_API_HOST}/products/current/${value}`;
export const addRemoveProductLink = `${PRODUCTS_API_HOST}/basket`;
export const updateCountLink = `${PRODUCTS_API_HOST}/basket/update_count`;
export const addCommentLink = `${PRODUCTS_API_HOST}/products/comment`;
export const rateLink = `${PRODUCTS_API_HOST}/products/react`;
export const purchaseLink = `${PRODUCTS_API_HOST}/basket/purchase`;
export const categoriesLink = (value) => `${PRODUCTS_API_HOST}/products/search?query=${value}`;
export const collectionLink = `${PRODUCTS_API_HOST}/products/ce913442-740f-4b5c-956d-bed0ea4d2e2b`;
export const accessoriasLink = `${PRODUCTS_API_HOST}/products/1cd52a22-6a96-4aeb-8577-ec8f1de19c8d`;