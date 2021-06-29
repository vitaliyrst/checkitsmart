import Catalog from "../components/Catalog/Catalog";
import Video from "../components/Catalog/Video/Video";
import Category from "../components/Catalog/Category/Category";
import Product from "../components/Catalog/Category/Product/Product";
import Cart from "../components/Cart/Cart";

const routes = [
    {
        path: '/catalog',
        Component: Catalog,
        name: 'Catalog',
        exact: true
    },
    {
        path: '/video',
        Component: Video,
        name: 'Video',
        exact: true
    },
    {
        path: '/catalog/:category',
        Component: Category,
        name: 'Category',
        exact: true
    },
    {
        path: '/catalog/:category/:id',
        Component: Product,
        name: 'Product',
        exact: true

    },
    {
        path: '/cart',
        name: 'Cart',
        Component: Cart,
        exact: true
    }
];

export default routes;