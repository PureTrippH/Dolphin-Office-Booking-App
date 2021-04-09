import axios from 'axios';

export const getAccountInf = async() => {
        return await axios.get('http://localhost:3001/userInf');
}

