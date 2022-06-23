import axios from '../utils/httpRequest';

const getHomePage = (inputId) => {
    return axios.get(`/?id=${inputId}`);
};

export { getHomePage };
