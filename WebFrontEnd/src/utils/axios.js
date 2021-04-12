import axios from 'axios';
export const getAccountInf = async() => {
        return axios.get('http://localhost:3001/userInf', {
                withCredentials: true});
        }

