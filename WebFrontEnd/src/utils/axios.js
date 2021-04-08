import axios from 'axios';

const getAccountInf = async() => {
    await axios.get('http://localhost:3001/getUserInf')
}


export default getAccountInf;