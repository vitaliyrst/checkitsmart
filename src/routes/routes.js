import Catalog from "../components/Catalog/Catalog";
import Category from "../components/Catalog/Category/Category";
import Cart from "../components/Cart/Cart";
import Form from "../components/Cart/Form/Form";
import QR from "../components/QR/QR";
import ProductCard from "../components/Catalog/Category/ProductCard/ProductCard";

const routes = [
    {
        path: '/catalog',
        Component: Catalog,
        name: 'Catalog',
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
        Component: ProductCard,
        name: 'ProductCard',
        exact: true
    },
    {
        path: '/cart',
        name: 'Cart',
        Component: Cart,
        exact: true
    },
    {
        path: '/cart/form',
        name: 'Form',
        Component: Form,
        exact: true
    },
    {
        path: '/qr',
        name: 'QR',
        Component: QR,
        exact: true
    }
];

export default routes;
