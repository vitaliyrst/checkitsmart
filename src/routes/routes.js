import Catalog from "../components/Catalog/Catalog";
import Video from "../components/Catalog/Video/Video";
import Category from "../components/Catalog/Category/Category";
import Size from "../components/Size/Size";
import Product from "../components/Catalog/Category/Product/Product";
import data from '../data.json';
import Cart from "../components/Cart/Cart";

const routes = [
    {
        path: '/catalog',
        Component: Catalog,
        name: 'Catalog',
        data: data,
        exact: true
    },
    {
        path: '/video',
        Component: Video,
        name: 'Video',
        exact: true
    },
    {
        path: '/catalog/:category/:id',
        name: 'Product',
        component: Product,
        data: data,
        exact: true

    },
    {
        path: '/catalog/:category',
        Component: Category,
        name: 'Category',
        data: data,
        exact: true
    },
    {
        path: '/size/:category',
        Component: Size,
        name: 'Size',
        data: data,
        exact: true
    },

    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        data: data,
        exact: true
    }
];

export default routes;