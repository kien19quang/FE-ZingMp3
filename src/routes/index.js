import Home from '@/pages/Home/Home';
import Album from '@/pages/Album/Album';
import config from '@/config';

const publicRoutes = [
    { path: config.routes.album, component: Album },
    { path: config.routes.home, component: Home },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
