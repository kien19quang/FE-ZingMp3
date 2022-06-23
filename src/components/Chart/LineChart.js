import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './LineChart.scss';
import Image from '@/assets/images/Cover image/karik.jpg';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

Chart.register(...registerables);

function LineChart({ chart, items }) {
    let options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                displayColors: false,
                xAlign: 'center',
                yAlign: 'bottom',
                callbacks: {
                    title: function () {
                        return 'Lượt nghe';
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'transparent',
                },
                ticks: {
                    color: 'white',
                    font: {
                        size: 14,
                        family: "'IBM Plex Sans', sans-serif",
                    },
                },
            },
            y: {
                ticks: {
                    display: false,
                },
                grid: {
                    borderDash: [2, 4],
                    color: 'rgb(150, 150, 150)',
                    drawBorder: false,
                    drawTicks: false,
                    tickLength: 10,
                },
                min: chart.minScore,
                max: chart.maxScore,
            },
        },
    };

    let handlePercentTopSong = (score) => {
        let totalScore = chart.totalScore;
        return `${Math.floor((score * 100) / totalScore, 0)}%`;
    };

    let handleTimes = (times) => {
        let labels = [];
        times.forEach((item, index) => {
            if (index % 2 === 0 && index < 23) {
                labels.push(item.hour + ':00');
            }
        });
        return labels;
    };

    let handleCounter = (items, encodeId) => {
        let counters = [];
        items[encodeId].map((item, index) => {
            if (index % 2 === 0 && index < 24) {
                counters.push(item.counter);
            }
        });
        return counters;
    };

    let labels = chart.times ? handleTimes(chart.times) : [];
    let counter1 = chart.items ? handleCounter(chart.items, items[0].encodeId) : [];
    let counter2 = chart.items ? handleCounter(chart.items, items[1].encodeId) : [];
    let counter3 = chart.items ? handleCounter(chart.items, items[2].encodeId) : [];

    const data = {
        labels,
        datasets: [
            {
                label: items[0].title,
                data: counter1,
                backgroundColor: 'rgb(74,144,226)',
                borderColor: 'rgb(74,144,226)',
                borderWidth: 2,
                tension: 0.3,
                pointStyle: 'circle',
                pointBackgroundColor: 'white',
                pointBorderColor: 'rgb(74,144,226)',
                pointHoverBackgroundColor: 'rgb(74,144,226)',
                pointHoverBorderColor: 'white',
                pointBorderWidth: 3,
                pointHoverBorderWidth: 3,
                pointHitRadius: 8,
                radius: 5,
                pointHoverRadius: 8,
                showPoint: false,
            },

            {
                label: items[1].title,
                data: counter2,
                backgroundColor: 'rgb(39, 189, 156)',
                borderColor: 'rgb(39, 189, 156)',
                borderWidth: 2,
                tension: 0.3,
                pointStyle: 'circle',
                pointBackgroundColor: 'white',
                pointBorderColor: 'rgb(39, 189, 156)',
                pointHoverBackgroundColor: 'rgb(39, 189, 156)',
                pointHoverBorderColor: 'white',
                pointBorderWidth: 3,
                pointHoverBorderWidth: 3,
                radius: 5,
                pointHoverRadius: 8,
            },

            {
                label: items[2].title,
                data: counter3,
                backgroundColor: 'rgb(227, 80, 80)',
                borderColor: 'rgb(227, 80, 80)',
                borderWidth: 2,
                tension: 0.3,
                pointStyle: 'circle',
                pointBackgroundColor: 'white',
                pointBorderColor: 'rgb(227, 80, 80)',
                pointHoverBackgroundColor: 'rgb(227, 80, 80)',
                pointHoverBorderColor: 'white',
                pointBorderWidth: 3,
                pointHoverBorderWidth: 3,
                radius: 5,
                pointHoverRadius: 8,
            },
        ],
    };

    let dataTopSongs = items ? items.slice(0, 3) : [];

    return (
        <div className="chart-wrapper">
            <div className="chart-content">
                <div className="chart-content-left">
                    <div className="chart-content-header">
                        #zingchart
                        <FontAwesomeIcon icon={faCirclePlay} />
                    </div>
                    <div className="chart-song-list">
                        {dataTopSongs &&
                            dataTopSongs.map((item, index) => {
                                return (
                                    <div className="chart-song-item" key={item.encodeId}>
                                        <div className="item-left">
                                            <span className={`number-rank-${index + 1}`}>{index + 1}</span>
                                            <img src={item.thumbnailM} alt={item.title} className="img-song-item" />
                                            <div className="text-block">
                                                <div className="title"> {item.title} </div>
                                                <div className="sub-title">{item.artistsNames} </div>
                                            </div>
                                        </div>
                                        <span className="persent"> {handlePercentTopSong(item.score)} </span>
                                    </div>
                                );
                            })}
                    </div>

                    <div className="chart-footer">
                        <div className="show-more">Xem thêm</div>
                    </div>
                </div>
                <div className="line-chart">
                    <Line options={options} data={data} />
                </div>
            </div>
        </div>
    );
}

export default LineChart;
