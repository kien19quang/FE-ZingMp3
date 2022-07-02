import classNames from 'classnames/bind';
import styles from './WeekChart.modulo.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faMusic } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePlaylist, updateIndex, updatePlay, updateLinkSong } from '@/features/Song/SongSlice';
import { getSong } from '@/services/SongService';

const cx = classNames.bind(styles);

function WeekChart({ data, type = 'music' }) {
    let [hover, setHover] = useState(false);
    let [pos, setPos] = useState(0);

    let dispatch = useDispatch();

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

    let handlePlayMusic = async (item, index) => {
        let res = await getSong(item.encodeId);
        if (res.err === 0) {
            dispatch(updateLinkSong(res.data));
        }

        dispatch(updatePlaylist(data));
        dispatch(updateIndex(index));
        dispatch(updatePlay(true));
    };

    return (
        <>
            <div className={cx('weekchart-list')}>
                <div>
                    {data &&
                        data.map((item, index) => {
                            let nameClass = 'number-rank';
                            if (index < 3) {
                                nameClass = `number-rank-${index + 1}`;
                            }

                            return (
                                <div
                                    className={cx('weekchart-item')}
                                    onMouseOver={() => handleHover(index)}
                                    onMouseLeave={() => handleMouseLeave()}
                                    onClick={() => handlePlayMusic(item, index)}
                                >
                                    <div className={cx('weekchart-left')}>
                                        {type === 'music' ? (
                                            <FontAwesomeIcon icon={faMusic} />
                                        ) : (
                                            <p className={cx(`${nameClass}`)}>{index + 1}</p>
                                        )}
                                        {type === 'rank' && (
                                            <FontAwesomeIcon icon={faMinus} className={cx('icon-sort')} />
                                        )}
                                        <div className={cx('img-song-weekchart')}>
                                            <img
                                                src={item.thumbnailM}
                                                alt={item.title}
                                                className={cx('img-weekchart')}
                                            />
                                        </div>
                                        <div className={cx('weekchart-text')}>
                                            <span className={cx('title-weekchart')}>{item.title}</span>
                                            <span>{item.artistsNames}</span>
                                        </div>
                                    </div>

                                    <div className={cx('weekchart-right')}>
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
        </>
    );
}

export default WeekChart;
