import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../reducer/userReducer";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userActions.logout());
    navigate("/login");
  }, []);

  return <></>;
}
export default LogoutPage;
