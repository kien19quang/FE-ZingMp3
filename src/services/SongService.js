import axios from '../utils/httpRequest';

const getSong = (inputId) => {
    return axios.get(`/song/getSongById?id=${inputId}`);
};

export { getSong };
