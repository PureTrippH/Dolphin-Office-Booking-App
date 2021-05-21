import axios from 'axios';

//Get Google Account Info From User

//Get Google Account Info From User
export const getAccountInf = async() => {
        return axios.get('http://localhost:3001/userInf', 
        { withCredentials: true });
        }

//Get The Test Calendar from Google Calendar
export const getCalendar = async(calID) => {
        return axios.get(`http://localhost:3001/calendar/${calID}`, 
        { withCredentials: true });
}

export const writeToDB = async(email, phoneNum, date, message, name, duration) => {
        return axios.post(`http://localhost:3001/calendarInfo/writeReq`, {
                "Email": email,
                "PhoneNumber": phoneNum,
                "Date": date,
                "Message": message,
                "Name": name,
                "Duration": duration
        },
        { withCredentials: true });
}

export const getApps = async(name) => {
        return axios.get(`http://localhost:3001/appointments/${name}`, 
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

        
