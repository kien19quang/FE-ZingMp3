import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faGear, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import AvatarUser from '../../../../assets/images/Avatar-user.jpg';

const cx = classNames.bind(styles);

function Header() {
    return (
        <>
            <header className={cx('wrapper')}>
                <div className={cx('nav-left')}>
                    <div className={cx('button-left')}>
                        <button className={cx('btn', 'disabled')}>
                            <FontAwesomeIcon icon={faArrowLeft} className={cx('icon-arrow-left')} />
                        </button>
                        <button className={cx('btn', 'disabled')}>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                    <div className={cx('search')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon-search')} />
                        <input type="text" placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..." />
                    </div>
                </div>

                <div className={cx('nav-right')}>
                    <button className={cx('btn')}>
                        <FontAwesomeIcon icon={faGear} className={cx('icon-setting')} />
                    </button>
                    <button className={cx('btn')}>
                        <img src={AvatarUser} alt="" className={cx('avatar-user')} />
                    </button>
                </div>
            </header>
        </>
    );
}

export default Header;
