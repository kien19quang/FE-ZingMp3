import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Gallery.modulo.scss';
import { getSongInfo, getSong } from '@/services/SongService';
import { useDispatch } from 'react-redux';
import { updatePlaylist, updateIndex, updatePlay, updateLinkSong } from '@/features/Song/SongSlice';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Gallery({ bannerSlider, singers, type = 'primary' }) {
    let show = type === 'primary' ? 3 : 7;
    let dispatch = useDispatch();
    let navigate = useNavigate();

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: show,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    let handleNumberFarorites = (number) => {
        let n = number / 1000;
        let view = n.toFixed(1);
        return view + 'K';
    };

    let handlePlayBanner = async (item) => {
        let arr = item.link.split('/');
        if (arr[1] === 'bai-hat') {
            let songInfo = await getSongInfo(item.encodeId);

            if (songInfo.err === 0) {
                let res = await getSong(songInfo.data.encodeId);
                dispatch(updateLinkSong(res.data));
                dispatch(updatePlaylist([songInfo.data]));
                dispatch(updateIndex(0));
                dispatch(updatePlay(true));
            }
        }
        if (arr[1] === 'album') {
            navigate(item.link);
        }
    };

    return (
        <>
            <Slider {...settings} className={cx('slide-banner', { [type]: type })}>
                {bannerSlider &&
                    bannerSlider.map((item, index) => {
                        return (
                            <div className={cx('gallery-wrapper')} key={index}>
                                <div className={cx('gallery-item')} onClick={() => handlePlayBanner(item)}>
                                    <img src={item.banner} alt="" className={cx('img-gallery-item')} />
                                </div>
                            </div>
                        );
                    })}

                {singers &&
                    singers.map((item) => {
                        return (
                            <div className={cx('gallery-wrapper')} key={item.encodeId}>
                                <Link className={cx('gallery-item')} to={item.link}>
                                    <img
                                        src={item.thumbnail}
                                        alt={item.name}
                                        className={cx('img-gallery-item', { [type]: type })}
                                    />
                                </Link>

                                <Link className={cx('infor-singer')} to={item.link}>
                                    <span className={cx('name-singer')}>{item.name}</span>
                                    <span className={cx('number-favorites')}>
                                        <FontAwesomeIcon icon={faHeart} className={cx('icon-tym')} />
                                        {item.totalFollow ? handleNumberFarorites(item.totalFollow) : 0}
                                    </span>
                                </Link>
                            </div>
                        );
                    })}
            </Slider>
        </>
    );
}

export default Gallery;
