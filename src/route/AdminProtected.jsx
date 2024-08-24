import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import PropTypes from "prop-types";

AdminProtected.propTypes = {
    children: PropTypes.func.isRequired,
};


function AdminProtected({ children }) {
  const { token } = useSelector((state) => state.userReducer);

  const { pathname } = useLocation();
  if (!token) {
    return <Navigate to={`/login?redirectUrl=${pathname}`} replace />;
  }
  return children;
}

export default AdminProtected;
