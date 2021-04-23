import axios from 'axios';

//Get Google Account Info From User
export const getAccountInf = async() => {
        return axios.get('http://localhost:3001/userInf', 
        { withCredentials: true });
        }

//Clears the Website's Login Cookie to Logout
export const clearCookie = async() => {
        axios.get('http://localhost:3001/logout', 
        { withCredentials: true });
}

//Get The Test Calendar from Google Classroom
export const getCalendar = async() => {
        axios.get(`http://localhost:3001/getCalendar`, 
        { withCredentials: true });
}

        
