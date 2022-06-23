import classNames from 'classnames/bind';
import styles from './Carousel.modulo.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Carousel({ title, playlistSlider, weekTop, type = 'primary', to = '/' }) {
    return (
        <>
            <div className={cx('carousel-text')}>
                <span className={cx('carousel-title')}>{type === 'primary' && title}</span>
                {title === 'Top 100' && (
                    <Link to={to} className={cx('all-top-100')}>
                        <span>Tất cả</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                )}
            </div>
            <div className={cx('carousel-container')}>
                {playlistSlider &&
                    playlistSlider.map((item, index) => {
                        return (
                            <div className={cx('carousel-item', { [type]: type })} key={item.encodeId}>
                                <div className={cx('img-item-wrapper')}>
                                    <img src={item.thumbnailM} alt={item.title} className={cx('img-item')} />
                                </div>

                                <div className={cx('carousel-description')}>
                                    <span className={cx('main-text')}>{item.title}</span>
                                    <span className={cx('sub-text')}>{item.sortDescription}</span>
                                </div>
                            </div>
                        );
                    })}

                {weekTop &&
                    weekTop.map((item, index) => {
                        return (
                            <div className={cx('carousel-item', { [type]: type })} key={index}>
                                <div className={cx('img-item-wrapper')}>
                                    <img src={item.banner} alt={item.country} className={cx('img-item')} />
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

export default Carousel;
