import Home from '@/pages/Home/Home';
import Album from '@/pages/Album/Album';
import Top100 from '@/pages/Top100/Top100';
import ZingChart from '@/pages/ZingChart/ZingChart';
import config from '@/config';

const publicRoutes = [
    { path: config.routes.top100, component: Top100 },
    { path: config.routes.album, component: Album },
    { path: config.routes.playlist, component: Album },
    { path: config.routes.zingchart, component: ZingChart },
    { path: config.routes.home, component: Home },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
