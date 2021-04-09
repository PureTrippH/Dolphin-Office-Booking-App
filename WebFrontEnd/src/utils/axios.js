import axios from 'axios';

export const getAccountInf = async() => {
    await axios.get('http://localhost:3001/getUserInf')
}

