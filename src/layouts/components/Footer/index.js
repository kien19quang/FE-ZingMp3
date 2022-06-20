import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import Image from '@/assets/images/Cover image/karik.jpg';
import { buttonCenter, buttonLeft } from './Button';
import { faList, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

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
                        {buttonLeft &&
                            buttonLeft.map((item, index) => {
                                return (
                                    <Tippy content={item.content}>
                                        <button className={cx('btn')} key={index}>
                                            <FontAwesomeIcon icon={item.icon} />
                                        </button>
                                    </Tippy>
                                );
                            })}
                    </div>
                </div>
                <div className={cx('content-center')}>
                    <div className={cx('control-center')}>
                        {buttonCenter &&
                            buttonCenter.map((item, index) => {
                                return (
                                    <button className={cx('btn', index === 2 && 'btn-center')} key={index}>
                                        <FontAwesomeIcon icon={item.icon} />
                                    </button>
                                );
                            })}
                    </div>

                    <div className={cx('time-control')}>
                        <span className={cx('time-left')}>00:40</span>
                        <div className={cx('progress-bar')}>
                            <div className={cx('progress')}>
                                <div className={cx('slider-handle')}></div>
                            </div>
                        </div>
                        <span className={cx('time-right')}>3.29</span>
                    </div>
                </div>
                <div className={cx('content-right')}>
                    <div className={cx('sound-control')}>
                        <button className={cx('btn')}>
                            <FontAwesomeIcon icon={faVolumeHigh} className={cx('icon-volume')} />
                        </button>
                        <div className={cx('progress-bar')}>
                            <div className={cx('progress')}>
                                <div className={cx('slider-handle')}></div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('list-music')}>
                        <Tippy content="Danh sách phát">
                            <button className={cx('btn')}>
                                <FontAwesomeIcon icon={faList} />
                            </button>
                        </Tippy>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
