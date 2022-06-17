import Header from '@/components/Layouts/components/Header';
import Sidebar from '@/components/Layouts/components/Sidebar';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <>
            <div className={cx('wrapper')}>
                <Sidebar />
                <div className={cx('container-right')}>
                    <Header />
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;
