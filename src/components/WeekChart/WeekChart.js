import classNames from 'classnames/bind';
import styles from './WeekChart.modulo.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faMusic, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlaylist, updateIndex, updatePlay, updateLinkSong } from '@/features/Song/SongSlice';
import { getSong } from '@/services/SongService';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { toast } from 'react-toastify';
import { addSongFavorite, removeSongFavorite } from '@/features/Song/SongSlice';

const cx = classNames.bind(styles);

function WeekChart({ data, type = 'music', styleActive = 'default' }) {
    let [hover, setHover] = useState(false);
    let [pos, setPos] = useState(null);
    let [listFavorite, setListFavorite] = useState([]);
    let playlistFavorite = useSelector((state) => state.song.playlistFavorite);

    let dispatch = useDispatch();
    let indexSong = useSelector((state) => state.song.index);
    let playlist = useSelector((state) => state.song.playlist);
    let dataSong = playlist[indexSong];

    useEffect(() => {
        let arrFavoriteSong = [];

        if (playlistFavorite.length > 0 && data.length > 0) {
            for (let i = 0; i < playlistFavorite.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (playlistFavorite[i].encodeId === data[j].encodeId) {
                        arrFavoriteSong.push(j);
                    }
                }
            }
        }

        setListFavorite(arrFavoriteSong);
    }, [data, playlistFavorite]);

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

    let handleAddSongFavorite = (item, index) => {
        setListFavorite([...listFavorite, index]);
        dispatch(addSongFavorite(item));
        toast.success('Đã thêm bài hát vào thư viện');
    };

    let handleRemoveSongFavorite = (item, index) => {
        if (listFavorite.length > 0) {
            let copyListFavorite = [];
            listFavorite.forEach((item) => {
                if (item !== index) {
                    copyListFavorite.push(item);
                }
            });
            setListFavorite(copyListFavorite);
        }
        dispatch(removeSongFavorite(item.encodeId));
        toast.error('Đã xóa bài hát khỏi thư viện');
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

                            let isActive = '';
                            if (index === indexSong && item.encodeId === dataSong.encodeId) {
                                if (styleActive === 'default') {
                                    isActive = 'is-active-default';
                                } else {
                                    isActive = 'is-active';
                                }
                            }

                            return (
                                <div
                                    className={cx('weekchart-item', `${isActive}`)}
                                    onMouseOver={() => handleHover(index)}
                                    onMouseLeave={() => handleMouseLeave()}
                                >
                                    <div className={cx('weekchart-left')} onClick={() => handlePlayMusic(item, index)}>
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
                                                {!listFavorite.includes(index) ? (
                                                    <Tippy content="Thêm vào thư viện">
                                                        <button
                                                            className={cx('btn')}
                                                            onClick={() => handleAddSongFavorite(item, index)}
                                                        >
                                                            <FontAwesomeIcon icon={faHeart} />
                                                        </button>
                                                    </Tippy>
                                                ) : (
                                                    <Tippy content="Xóa khỏi thư viện">
                                                        <button
                                                            className={cx('btn', `active`)}
                                                            onClick={() => handleRemoveSongFavorite(item, index)}
                                                        >
                                                            <FontAwesomeIcon icon={faHeartSolid} />
                                                        </button>
                                                    </Tippy>
                                                )}
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
