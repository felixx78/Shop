import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/definition";
import { userActions } from "../reducer/userReducer";
import { useNavigate } from "react-router-dom";
import AuthInput from "../components/AuthInput";
import axiosPrivate from "../api/axiosPrivate";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function MyAccountPage() {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    password: { isError: false, errorMessage: "" },
    confirm_password: { isError: false, errorMessage: "" },
  });

  const handleLogout = () => {
    dispatch(userActions.logout());
    navigate("/login");
  };

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password")?.toString().trim();
    const confirm_password = formData
      .get("confirm_password")
      ?.toString()
      .trim();

    if (!password) {
      setErrors((prev) => ({
        ...prev,
        password: { isError: true, errorMessage: "Require" },
      }));
    }

    if (!confirm_password) {
      setErrors((prev) => ({
        ...prev,
        confirm_password: { isError: true, errorMessage: "Require" },
      }));
      return;
    }

    if (password !== confirm_password) {
      setErrors((prev) => ({
        ...prev,
        confirm_password: {
          isError: true,
          errorMessage: "Passwords doesn't match",
        },
      }));
      return;
    }

    axiosPrivate.post("/api/user/changepassword", { password: password });

    toast("Password changed", {
      style: { background: "#4CAF50" },
      bodyStyle: { color: "#fbfafc" },
    });

    e.currentTarget.reset();
  };

  return (
    <div className="px-4">
      <ToastContainer hideProgressBar autoClose={1500} />
      <div className="mx-auto max-w-[300px] pt-2">
        <h1 className="mb-2 text-2xl font-bold">My account</h1>
        <div className="mb-1">email: {user.email}</div>
        <div className="mb-4">role: {user.role}</div>

        <h2 className="mb-2 text-lg font-bold">Change password</h2>
        <form onSubmit={handleChangePassword} className="mb-4">
          <AuthInput
            label="Password"
            name="password"
            type="password"
            required
            isError={errors.password.isError}
            errorMessage={errors.confirm_password.errorMessage}
          />
          <AuthInput
            label="Confirm Password"
            name="confirm_password"
            type="password"
            required
            isError={errors.confirm_password.isError}
            errorMessage={errors.confirm_password.errorMessage}
          />
          <button
            type="submit"
            className="mx-auto w-full bg-primary py-2 font-bold hover:bg-primary-dark"
          >
            Submit
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="ml-auto mr-0 inline-block hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default MyAccountPage;
