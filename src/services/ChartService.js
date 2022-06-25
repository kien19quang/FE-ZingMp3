import axios from '../utils/httpRequest';

const getChartHomeAPI = () => {
    return axios.get(`/zing-chart/getChartHome`);
};

export { getChartHomeAPI };
