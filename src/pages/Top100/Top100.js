import classNames from 'classnames/bind';
import styles from './Top100.modulo.scss';
import { useEffect, useState } from 'react';
import Carousel from '@/components/Carousel/Carousel';

import { getTop100API } from '@/services/Top100Service';
let cx = classNames.bind(styles);

function Top100() {
    let [top100, setTop100] = useState([]);

    useEffect(() => {
        let getTop100 = async () => {
            let res = await getTop100API();

            if (res.err === 0) {
                setTop100(res.data);
            }
        };

        getTop100();
    }, []);

    console.log(top100);

    return (
        <>
            <div className={cx('wrapper-top100')}>
                {top100 &&
                    top100.map((item) => {
                        return <Carousel title={item.title} playlistSlider={item.items} />;
                    })}
            </div>
        </>
    );
}

export default Top100;
