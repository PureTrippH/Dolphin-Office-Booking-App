import axios from 'axios';
export const getAccountInf = async() => {
        let info = await axios.get('http://localhost:3001/userInf');
        return info.user
}

