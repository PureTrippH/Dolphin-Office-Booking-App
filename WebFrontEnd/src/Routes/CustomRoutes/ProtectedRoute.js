import {Switch, Route, Redirect} from 'react-router-dom';
import { isLoggedIn } from "../../utils/axios";
const ProtectedRoute = (props) => {
    return (
      <Route render={() => {
        return props.loggedIn ? props.children : <Redirect to='/' />}}/>
    );
  };
export default ProtectedRoute;