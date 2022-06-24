import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectionMain, sectionAdd } from './Selection';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <>
            <div className={cx('Sidebar')}>
                <div className={cx('logo-mp3')}></div>
                <div className={cx('selection-main')}>
                    {selectionMain &&
                        selectionMain.map((item, index) => {
                            return (
                                <div
                                    className={cx('select', `${item.option}`, index === 0 ? 'active' : '')}
                                    key={index}
                                    title={item.value}
                                >
                                    <FontAwesomeIcon icon={item.icon} />
                                    <span>{item.value}</span>
                                </div>
                            );
                        })}
                </div>

                <div className={cx('sidebar-divide')}></div>

                <div className={cx('selection-add')}>
                    {sectionAdd &&
                        sectionAdd.map((item, index) => {
                            return (
                                <Link
                                    to={item.to}
                                    className={cx('select', `${item.option}`)}
                                    key={index}
                                    title={item.value}
                                >
                                    <FontAwesomeIcon icon={item.icon} />
                                    <span>{item.value}</span>
                                </Link>
                            );
                        })}

                    <div className={cx('sidebar-banner')}>
                        <span>Nghe nhạc không quảng cáo cùng kho nhạc VIP</span>

                        <button>Nâng cấp vip</button>
                    </div>

                    <div className={cx('libary')}>
                        <span className={cx('tittle')}>Thư viện</span>
                    </div>

                    <div className={cx('selection-libary')}>
                        <div className={cx('select', 'the-song')}>
                            <img src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-song.cf0cb0b4.svg" />
                            <span>Bài hát</span>
                        </div>

                        <div className={cx('select', 'playlist')}>
                            <img src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-playlist.7e92a5f0.svg" />
                            <span>Playlist</span>
                        </div>

                        <div className={cx('select', 'recent')}>
                            <img src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-history.374cb625.svg" />
                            <span>Gần đây</span>
                        </div>
                    </div>
                </div>

                <div className={cx('add-playlist')}>
                    <FontAwesomeIcon icon={faPlus} className={cx('icon-add-playlist')} />
                    <span>Tạo playlist mới</span>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
