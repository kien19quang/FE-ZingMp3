import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
    faBackwardStep,
    faEllipsis,
    faForwardStep,
    faRepeat,
    faShuffle,
    faCirclePlay,
} from '@fortawesome/free-solid-svg-icons';

let buttonLeft = [
    { content: 'Thêm vào thư viện', icon: faHeart },
    { content: 'Xem thêm', icon: faEllipsis },
];

let buttonCenter = [
    { icon: faShuffle },
    { icon: faBackwardStep },
    { icon: faCirclePlay },
    { icon: faForwardStep },
    { icon: faRepeat },
];

export { buttonLeft, buttonCenter };
