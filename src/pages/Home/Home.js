import classNames from 'classnames/bind';
import styles from './Home.mudulo.scss';
import { useEffect, useState } from 'react';

import Gallery from '@/components/Gallery/Gallery';
import Carousel from '@/components/Carousel/Carousel';
import LineChart from '@/components/Chart/LineChart';
import { getHomePage } from '@/services/HomeService';

const cx = classNames.bind(styles);

function Home() {
    let [bannerSlider, setBannerSlider] = useState([]);
    let [playlistSlider, setPlaylistSlider] = useState([]);
    let [weekTop, setWeekTop] = useState([]);
    let [singers, setSingers] = useState([]);
    let [top100, setTop100] = useState({});
    let [chart, setChart] = useState({});

    useEffect(() => {
        const getAllHomePage = async () => {
            let homePage1 = await getHomePage(1);
            let homePage2 = await getHomePage(2);
            let homePage3 = await getHomePage(3);

            if (homePage1.err === 0 && homePage2.err === 0) {
                setBannerSlider(homePage1.data.items[0].items);
                setPlaylistSlider([homePage1.data.items[3], homePage1.data.items[4], homePage2.data.items[1]]);
            }
            if (homePage3.err === 0) {
                setChart(homePage3.data.items[0]);
                setWeekTop(homePage3.data.items[1].items);
                setSingers(homePage3.data.items[2].items);
                setTop100(homePage3.data.items[3]);
            }
        };

        getAllHomePage();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Gallery bannerSlider={bannerSlider ? bannerSlider : {}} />
            {playlistSlider &&
                playlistSlider.map((item) => {
                    return <Carousel title={item.title} playlistSlider={item.items} />;
                })}
            {chart.chart && <LineChart chart={chart.chart} items={chart.items} />}

            {weekTop && <Carousel type="large" weekTop={weekTop} />}
            {singers && <Gallery type="rounded" singers={singers} />}
            {top100 && (
                <Carousel
                    title={top100.title}
                    to={top100.link}
                    showMore={true}
                    playlistSlider={top100.items && top100.items.slice(0, 5)}
                />
            )}
        </div>
    );
}

export default Home;
