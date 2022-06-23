import Header from '@/layouts/components/Header/Header';
import Sidebar from '@/layouts/components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('wrapper-up')}>
                    <Sidebar />

                    <div className={cx('container-right')}>
                        <Header />
                        <div className={cx('content')}>{children}</div>
                    </div>
                </div>

                <div className={cx('wrapper-down')}>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;
