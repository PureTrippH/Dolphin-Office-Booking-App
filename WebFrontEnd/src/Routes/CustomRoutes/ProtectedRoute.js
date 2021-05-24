import {Switch, Route, Redirect} from 'react-router-dom';
import { isLoggedIn } from "../../utils/axios";
const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          return loggedIn ? <Comp {...props} /> : <Redirect to="/" />;
        }}
      />
    );
  };
export default ProtectedRoute;