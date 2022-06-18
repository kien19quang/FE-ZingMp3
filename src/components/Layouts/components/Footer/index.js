import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '@/assets/images/Cover image/karik.jpg';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
    faBackwardStep,
    faCirclePlay,
    faEllipsis,
    faForwardStep,
    faRepeat,
    faShuffle,
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Footer() {
    return (
        <>
            <div className={cx('footer')}>
                <div className={cx('content-left')}>
                    <img src={Image} alt="" className={cx('avatar-song')} />
                    <div className={cx('description')}>
                        <div className={cx('song-name')}>Anh Là Của Em</div>

                        <div className={cx('author')}>Karik</div>
                    </div>
                    <div className={cx('icon-music')}>
                        <button className={cx('btn')}>
                            <FontAwesomeIcon icon={faHeart} />
                        </button>

                        <button className={cx('btn')}>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                    </div>
                </div>
                <div className={cx('content-center')}>
                    <div className={cx('control-center')}>
                        <button className={cx('btn')}>
                            <FontAwesomeIcon icon={faShuffle} />
                        </button>
                        <button className={cx('btn')}>
                            <FontAwesomeIcon icon={faBackwardStep} />
                        </button>
                        <button className={cx('btn', 'btn-center')}>
                            <FontAwesomeIcon icon={faCirclePlay} />
                        </button>
                        <button className={cx('btn')}>
                            <FontAwesomeIcon icon={faForwardStep} />
                        </button>
                        <button className={cx('btn')}>
                            <FontAwesomeIcon icon={faRepeat} />
                        </button>
                    </div>
                </div>
                <div className={cx('content-right')}></div>
            </div>
        </>
    );
}

export default Footer;
