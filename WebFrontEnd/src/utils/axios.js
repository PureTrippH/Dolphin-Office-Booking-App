import axios from 'axios';

//Get Google Account Info From User
export const getAccountInf = async() => {
        return axios.get('http://localhost:3001/userInf', 
        { withCredentials: true });
        }

//Get The Test Calendar from Google Calendar
export const getCalendar = async(calID) => {
        axios.get(`http://localhost:3001/calendar/${calID}`, 
        { withCredentials: true });
}

//Clears the Website's Login Cookie to Logout
export const clearCookie = async() => {
        axios.get('http://localhost:3001/logout', 
        { withCredentials: true });
}


export const logout = async() => {
        axios.get(`http://localhost:3001/logout`, 
        { withCredentials: true });
}


        
