import { HeaderOnly } from '@/components/Layout';

import Home from '@/pages/Home/Home';
import Album from '@/pages/Album/Album';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/album', component: Album },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
