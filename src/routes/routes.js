import Catalog from "../components/Catalog/Catalog";
import Video from "../components/Catalog/Video/Video";
import Category from "../components/Catalog/Category/Category";
import Cart from "../components/Cart/Cart";
import Form from "../components/Cart/Form/Form";

const routes = [
    {
        path: '/catalog',
        Component: Catalog,
        name: 'Catalog',
        exact: true
    },
    {
        path: '/catalog/video',
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
    }
];

export default routes;