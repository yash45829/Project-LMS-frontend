import { useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router-dom";
import DeniedPage from "../../Pages/DeniedPage.jsx";
import LoginPage from "../../Pages/LoginPage.jsx";

function RequireAuth({ allowedRoles }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  return isLoggedIn && allowedRoles.find((myrole) => myrole == role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to={<DeniedPage />} />
  ) : (
    <Navigate to={LoginPage} />
  );
}

export default RequireAuth;
