import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Gallery.modulo.scss';

const cx = classNames.bind(styles);

function Gallery({ bannerSlider, singers, type = 'primary' }) {
    let isCheck = type === 'primary';
    let show = type === 'primary' ? 3 : 7;

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: show,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: isCheck,
    };

    let handleNumberFarorites = (number) => {
        let n = number / 1000;
        let view = n.toFixed(1);
        return view + 'K';
    };

    return (
        <>
            <Slider {...settings} className={cx('slide-banner', { [type]: type })}>
                {bannerSlider &&
                    bannerSlider.map((item, index) => {
                        return (
                            <div className={cx('gallery-wrapper')} key={index}>
                                <div className={cx('gallery-item')}>
                                    <img src={item.banner} alt="" className={cx('img-gallery-item')} />
                                </div>
                            </div>
                        );
                    })}

                {singers &&
                    singers.map((item) => {
                        return (
                            <div className={cx('gallery-wrapper')} key={item.encodeId}>
                                <div className={cx('gallery-item')}>
                                    <img
                                        src={item.thumbnail}
                                        alt={item.name}
                                        className={cx('img-gallery-item', { [type]: type })}
                                    />
                                </div>

                                <div className={cx('infor-singer')}>
                                    <span className={cx('name-singer')}>{item.name}</span>
                                    <span className={cx('number-favorites')}>
                                        <FontAwesomeIcon icon={faHeart} className={cx('icon-tym')} />
                                        {item.totalFollow ? handleNumberFarorites(item.totalFollow) : 0}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
            </Slider>
        </>
    );
}

export default Gallery;
