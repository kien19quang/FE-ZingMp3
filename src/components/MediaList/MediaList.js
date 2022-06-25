import classNames from 'classnames/bind';
import styles from './MediaList.modulo.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faList, faMinus, faMusic } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function MediaList({ data, type = 'music', show = false }) {
    let [hover, setHover] = useState(false);
    let [pos, setPos] = useState(0);

    let handleTime = (secondsTotal) => {
        let hour = Math.floor(secondsTotal / 3600) === 0 ? '' : Math.floor(secondsTotal / 3600) + ':';
        let minutesTotal = secondsTotal % 3600;
        let minutes = Math.floor(minutesTotal / 60) === 0 ? '00:' : Math.floor(minutesTotal / 60) + ':';
        let seconds = minutesTotal % 60;
        if (('' + seconds).length === 1) {
            seconds = '0' + seconds;
        }
        if (('' + minutes).length === 2) {
            minutes = '0' + minutes;
        }

        return `${hour}${minutes}${seconds}`;
    };

    let handleHover = (index) => {
        setPos(index);
        setHover(true);
    };

    let handleMouseLeave = () => {
        setPos(-1);
        setHover(false);
    };

    return (
        <div className={cx('media-list')}>
            <div className={cx('select-header')}>
                <div className={cx('media-left')}>
                    <FontAwesomeIcon icon={faList} />
                    <span>Bài hát</span>
                </div>
                <div className={cx('media-content')}>
                    <span>Album</span>
                </div>
                <div className={cx('media-right')}>
                    <span>Thời gian</span>
                </div>
            </div>
            <div>
                {data &&
                    data.map((item, index) => {
                        let albumTitle = '';

                        if (item.album && item.album.title) {
                            albumTitle = item.album.title;
                        }

                        let nameClass = 'number-rank';
                        if (index < 3) {
                            nameClass = `number-rank-${index + 1}`;
                        }

                        return (
                            <div
                                className={cx('select-item')}
                                onMouseOver={() => handleHover(index)}
                                onMouseLeave={() => handleMouseLeave()}
                            >
                                <div className={cx('media-left')}>
                                    {type === 'music' ? (
                                        <FontAwesomeIcon icon={faMusic} />
                                    ) : (
                                        <p className={cx(`${nameClass}`)}>{index + 1}</p>
                                    )}
                                    {type === 'rank' && <FontAwesomeIcon icon={faMinus} className={cx('icon-sort')} />}
                                    <div className={cx('img-song-media')}>
                                        <img src={item.thumbnailM} alt={item.title} className={cx('img-song')} />
                                    </div>
                                    <div className={cx('media-text')}>
                                        <span className={cx('title-media')}>{item.title}</span>
                                        <span>{item.artistsNames}</span>
                                    </div>
                                </div>
                                <div className={cx('media-content')}>
                                    <span className={cx('desc-media')}>{albumTitle}</span>
                                </div>
                                <div className={cx('media-right')}>
                                    {index !== pos && (
                                        <div className={cx('time-item')}>
                                            <span>{handleTime(item.duration)}</span>
                                        </div>
                                    )}

                                    {hover && index === pos && (
                                        <div className={cx('hover-item')}>
                                            <button className={cx('btn')}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default MediaList;
