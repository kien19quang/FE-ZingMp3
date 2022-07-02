import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './Footer.scss';
import { buttonLeft } from './Button';
import { faCirclePause, faList, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { faBackwardStep, faForwardStep, faRepeat, faShuffle, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import HandleEvent from './HandleEvent';
import { useEffect, useState } from 'react';
import { updateIndex, updatePlay, updateLinkSong } from '@/features/Song/SongSlice';
import { getSong } from '@/services/SongService';
import { Slider } from 'react-semantic-ui-range';

const $ = document.querySelector.bind(document);

function Footer() {
    let [isPlay, setIsPlay] = useState(false);
    let [linkSong, setLinkSong] = useState({});
    let [isRandom, setIsRandom] = useState(false);
    let [isRepeat, setIsRepeat] = useState(false);
    let [progressPercent, setProgressPercent] = useState(1);
    let [volume, setVolume] = useState(10);
    let [oldVolume, setOldVolume] = useState(10);
    let [isSound, setIsSound] = useState(true);

    let dispatch = useDispatch();
    let playlist = useSelector((state) => state.song.playlist);
    let index = useSelector((state) => state.song.index);
    let playMusic = useSelector((state) => state.song.play);
    let link = useSelector((state) => state.song.linkSong);
    let dataSong = playlist[index];
    let currentTime = $('.time-left');
    let audio = $('#audio');

    useEffect(() => {
        if (!_.isEmpty(link)) {
            setLinkSong(link);
        }
    }, [link]);

    let handlePlayMusic = () => {
        if (playMusic && !_.isEmpty(linkSong)) {
            audio.currentTime = 0;
            HandleEvent.play(link, audio, false, audio.currentTime);
            dispatch(updatePlay(false));
            setIsPlay(true);
        }
    };

    handlePlayMusic();

    let handleClick = async (type, e) => {
        if (type === 'play') {
            HandleEvent.play(linkSong, audio, isPlay, audio.currentTime);
            setIsPlay(!isPlay);
        } else if (type === 'next') {
            if (!isRandom) {
                if (index === playlist.length - 1) {
                    index = 0;
                } else {
                    index += 1;
                }
            } else {
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * playlist.length);
                } while (index === newIndex);
                index = newIndex;
            }
            let res = await getSong(playlist[index].encodeId);
            if (res.err === 0) {
                dispatch(updateLinkSong(res.data));
            }
            dispatch(updateIndex(index));
            dispatch(updatePlay(true));
        } else if (type === 'prev') {
            if (!isRandom) {
                if (index === 0) {
                    index = playlist.length - 1;
                } else {
                    index -= 1;
                }
            } else {
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * playlist.length);
                } while (index === newIndex);
                index = newIndex;
            }
            let res = await getSong(playlist[index].encodeId);
            if (res.err === 0) {
                dispatch(updateLinkSong(res.data));
            }
            dispatch(updateIndex(index));
            dispatch(updatePlay(true));
        } else if (type === 'random') {
            setIsRandom(!isRandom);
        } else if (type === 'repeat') {
            setIsRepeat(!isRepeat);
        }
    };

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

    let handleOnTimeUpdate = () => {
        if (audio.duration) {
            currentTime.innerText = handleTime(Math.floor(audio.currentTime));
            setProgressPercent(((audio.currentTime / audio.duration) * 100).toFixed(4));
        }
    };

    let handleSound = () => {
        if (isSound) {
            audio.volume = 0;
            setIsSound(false);
            setOldVolume(volume);
            setVolume(0);
        } else {
            audio.volume = oldVolume / 10;
            setIsSound(true);
            setVolume(oldVolume);
        }
    };

    let handleOnEnded = () => {
        audio.currentTime = 0;
        if (isRepeat) {
            audio.play();
        } else {
            handleClick('next');
        }
    };

    const settingsProgress = {
        start: 1,
        min: 0,
        max: 100,
        step: 1,

        onChange: (value) => {
            if (Math.abs(value - progressPercent) > 2) {
                let seekTime = (audio.duration / 100) * value;
                audio.currentTime = seekTime;
            }
        },
    };

    const settingsVolume = {
        start: 10,
        min: 0,
        max: 10,
        step: 1,

        onChange: (value) => {
            setVolume(value);
            audio.volume = value / 10;
        },
    };

    return (
        <>
            <div className="footer">
                <div className="content-left">
                    {!_.isEmpty(dataSong) && (
                        <>
                            <img src={dataSong.thumbnailM} alt={dataSong.title} className="avatar-song" />
                            <div className="description">
                                <div className="song-name">{dataSong.title}</div>

                                <div className="author">{dataSong.artistsNames}</div>
                            </div>
                        </>
                    )}
                    <div className="icon-music">
                        {buttonLeft &&
                            buttonLeft.map((item, index) => {
                                return (
                                    <Tippy content={item.content}>
                                        <button className="btn" key={index}>
                                            <FontAwesomeIcon icon={item.icon} />
                                        </button>
                                    </Tippy>
                                );
                            })}
                    </div>
                </div>
                <div className="content-center">
                    <div className="control-center">
                        <button
                            className={`btn btn-random ${isRandom && 'btn-active'}`}
                            onClick={() => handleClick('random')}
                        >
                            <FontAwesomeIcon icon={faShuffle} />
                        </button>
                        <button className="btn btn-prev" onClick={() => handleClick('prev')}>
                            <FontAwesomeIcon icon={faBackwardStep} />
                        </button>
                        <button className="btn btn-center" onClick={() => handleClick('play')}>
                            {isPlay ? (
                                <FontAwesomeIcon icon={faCirclePause} />
                            ) : (
                                <FontAwesomeIcon icon={faCirclePlay} />
                            )}
                        </button>
                        <button className="btn btn-next" onClick={() => handleClick('next')}>
                            <FontAwesomeIcon icon={faForwardStep} />
                        </button>
                        <button
                            className={`btn btn-repeat ${isRepeat && 'btn-active'}`}
                            onClick={() => handleClick('repeat')}
                        >
                            <FontAwesomeIcon icon={faRepeat} />
                        </button>

                        <audio id="audio" src="" onTimeUpdate={handleOnTimeUpdate} onEnded={handleOnEnded}></audio>
                    </div>

                    <div className="time-control">
                        <span className="time-left">00:00</span>
                        <div className="progress-bar">
                            <Slider
                                style={{ width: '480px' }}
                                inverted={false}
                                settings={settingsProgress}
                                className="progress"
                                value={progressPercent}
                            />
                        </div>
                        <span className="time-right">{handleTime(dataSong.duration)}</span>
                    </div>
                </div>
                <div className="content-right">
                    <div className="sound-control">
                        <button className="btn" onClick={handleSound}>
                            {isSound ? (
                                <FontAwesomeIcon icon={faVolumeHigh} className="icon-volume" />
                            ) : (
                                <FontAwesomeIcon icon={faVolumeXmark} className="icon-volume" />
                            )}
                        </button>
                        <div className="progress-bar">
                            <Slider
                                style={{ width: '70px' }}
                                inverted={false}
                                settings={settingsVolume}
                                className="progress"
                                value={volume}
                            />
                        </div>
                    </div>

                    <div className="list-music">
                        <Tippy content="Danh sách phát">
                            <button className="btn">
                                <FontAwesomeIcon icon={faList} />
                            </button>
                        </Tippy>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
