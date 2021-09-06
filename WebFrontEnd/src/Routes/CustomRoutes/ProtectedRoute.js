import {Switch, Route, Redirect} from 'react-router-dom';
import { isLoggedIn } from "../../utils/axios";
import { useHistory } from "react-router-dom";

const ProtectedRoute = (props) => {
  let history = useHistory();
    return (
      <Route render={() => {
        return props.loggedIn ? props.children : window.location.assign('http://localhost:3001//google')}}/>
    );
  };
export default ProtectedRoute;