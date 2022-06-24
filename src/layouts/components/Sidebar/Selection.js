import {
    faChartLine,
    faCompactDisc,
    faHeadphonesSimple,
    faPenToSquare,
    faRadio,
    faMusic,
    faList,
    faRankingStar,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';

let selectionMain = [
    { option: 'private', icon: faHeadphonesSimple, value: 'Cá nhân' },
    { option: 'discover', icon: faCompactDisc, value: 'Khám phá' },
    { option: 'zingchart', icon: faChartLine, value: '#Zingchart' },
    { option: 'radio', icon: faRadio, value: 'Radio' },
    { option: 'follow', icon: faPenToSquare, value: 'Theo dõi' },
];

let sectionAdd = [
    { option: 'new-music', icon: faMusic, value: 'Nhạc mới', to: '#' },
    { option: 'category', icon: faList, value: 'Thể loại', to: '#' },
    { option: 'top-100', icon: faRankingStar, value: 'Top 100', to: '/top100' },
    { option: 'MV', icon: faVideo, value: 'MV', to: '#' },
];

export { selectionMain, sectionAdd };
