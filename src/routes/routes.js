import Catalog from "../components/Catalog/Catalog";
import Video from "../components/Catalog/Video/Video";
import Category from "../components/Catalog/Category/Category";
import Size from "../components/Catalog/Size/Size";
import data from '../data.json';

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
    }
];

export default routes;