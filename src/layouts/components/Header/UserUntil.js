import classNames from 'classnames/bind';
import styles from './Setting.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function UserUntil() {
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('menu-item')}>
                <li>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className={cx('icon')} />
                    <span>Đăng xuất</span>
                </li>
            </ul>
        </div>
    );
}

export default UserUntil;
