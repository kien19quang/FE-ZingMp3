import Header from '@/layouts/components/Header';
import Sidebar from '@/layouts/components/Sidebar';
import Footer from '../components/Footer';
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
            <Footer />
        </>
    );
}

export default DefaultLayout;
