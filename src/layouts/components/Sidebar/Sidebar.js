import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectionMain, sectionAdd } from './Selection';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

function Sidebar() {
    let pathName = window.location.pathname;

    let handleSelection = (e) => {
        let elementActive = document.querySelector('.active');
        elementActive.classList.remove('active');
        if (e.target.nodeName === 'SPAN') {
            e.target.parentNode.classList.add('active');
        } else {
            e.target.classList.add('active');
        }
    };

    return (
        <>
            <div className="Sidebar">
                <Link to={'/'} className="logo-mp3">
                    {' '}
                </Link>
                <div className="selection-main">
                    {selectionMain &&
                        selectionMain.map((item, index) => {
                            let nameClass = '';
                            if (pathName === item.to) {
                                nameClass = 'active';
                            }

                            return (
                                <Link
                                    className={`select ${nameClass}`}
                                    key={index}
                                    title={item.value}
                                    onClick={(e) => handleSelection(e)}
                                    to={item.to}
                                >
                                    <FontAwesomeIcon icon={item.icon} />
                                    <span>{item.value}</span>
                                </Link>
                            );
                        })}
                </div>

                <div className="sidebar-divide"></div>

                <div className="selection-add">
                    {sectionAdd &&
                        sectionAdd.map((item, index) => {
                            let nameClass = '';
                            if (pathName === item.to) {
                                nameClass = 'active';
                            }
                            return (
                                <Link
                                    to={item.to}
                                    className={`select ${nameClass}`}
                                    key={index}
                                    title={item.value}
                                    onClick={(e) => handleSelection(e)}
                                >
                                    <FontAwesomeIcon icon={item.icon} />
                                    <span>{item.value}</span>
                                </Link>
                            );
                        })}

                    <div className="sidebar-banner">
                        <span>Nghe nh???c kh??ng qu???ng c??o c??ng kho nh???c VIP</span>

                        <button>N??ng c???p vip</button>
                    </div>

                    <div className="libary">
                        <span className="tittle">Th?? vi???n</span>
                    </div>

                    <div className="selection-libary">
                        <div className="select the-song">
                            <img
                                src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-song.cf0cb0b4.svg"
                                alt="B??i h??t"
                            />
                            <span>B??i h??t</span>
                        </div>

                        <div className="select playlist">
                            <img
                                src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-playlist.7e92a5f0.svg"
                                alt="Playlist"
                            />
                            <span>Playlist</span>
                        </div>

                        <div className="select recent">
                            <img
                                src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-history.374cb625.svg"
                                alt="G???n ????y"
                            />
                            <span>G???n ????y</span>
                        </div>
                    </div>
                </div>

                <div className="add-playlist">
                    <FontAwesomeIcon icon={faPlus} className="icon-add-playlist" />
                    <span>T???o playlist m???i</span>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
