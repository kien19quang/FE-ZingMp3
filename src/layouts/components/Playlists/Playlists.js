import './Playlists.scss';
import { useSelector } from 'react-redux';
import WeekChart from '@/components/WeekChart/WeekChart';

function Playlists() {
    let playlist = useSelector((state) => state.song.playlist);
    let showPlaylist = useSelector((state) => state.song.showPlaylist);

    return (
        <div className={`playlist-wrapper ${showPlaylist ? 'show-playlist' : ''}`}>
            <div className="header-playlist">
                <div className="tab-bar">
                    <div className="item is-active">Danh sách phát</div>
                    <div className="item">Nghe gần đây</div>
                </div>
            </div>
            <div className="list-music">
                <WeekChart data={playlist} styleActive="primary" />
            </div>
        </div>
    );
}

export default Playlists;
