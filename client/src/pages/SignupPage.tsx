import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { userActions } from "../reducer/userReducer";
import AuthInput from "../components/AuthInput";
import SubmitButton from "../components/SubmitButton";

function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({
    email: { isError: false, errorMessage: "" },
    password: { isError: false, errorMessage: "" },
    confirm_password: { isError: false, errorMessage: "" },
  });

  const handleOnSubmit = () => {
    const email = data.email.trim();
    const password = data.password.trim();
    const confirm_password = data.confirm_password.trim();

    if (!email) {
      setErrors((prev) => ({
        ...prev,
        email: {
          isError: true,
          errorMessage: "Required",
        },
      }));
    }
    if (!password) {
      setErrors((prev) => ({
        ...prev,
        password: {
          isError: true,
          errorMessage: "Required",
        },
      }));
    }
    if (!confirm_password) {
      setErrors((prev) => ({
        ...prev,
        confirm_password: {
          isError: true,
          errorMessage: "Required",
        },
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

    axios
      .post("/api/auth/signup", { email, password })
      .then((res) => res.data)
      .then((data) => {
        localStorage.setItem("accessToken", data.accessToken);
        dispatch(userActions.auth(data.payload));

        navigate("/");
      })
      .catch((e) => {
        if (e.response.data === "User already exist") {
          setErrors((prev) => ({
            ...prev,
            email: {
              errorMessage: "This email already taken",
              isError: true,
            },
          }));
        } else if (e.response.data === "User does not exist") {
          setErrors((prev) => ({
            ...prev,
            email: {
              errorMessage: "User not found",
              isError: true,
            },
          }));
        }
      });
  };
  return (
    <div className="flex flex-col justify-center px-2 pt-6 md:min-h-[70vh]">
      <div className="mx-auto rounded-md bg-foreground px-6 py-8 sm:w-[400px] dark:bg-dark-foreground">
        <h1 className="mb-2 text-center text-2xl font-bold">Sign Up</h1>

        <AuthInput
          label="Email"
          name="email"
          type="email"
          value={data.email}
          onChange={(s) => setData((prev) => ({ ...prev, email: s }))}
          isError={errors.email.isError}
          required
          errorMessage={errors.email.errorMessage}
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
          value={data.password}
          onChange={(s) => setData((prev) => ({ ...prev, password: s }))}
          isError={errors.password.isError}
          required
          errorMessage={errors.password.errorMessage}
        />

        <AuthInput
          label="Confirm Password"
          name="confirm_password"
          type="password"
          value={data.confirm_password}
          onChange={(s) =>
            setData((prev) => ({ ...prev, confirm_password: s }))
          }
          isError={errors.confirm_password.isError}
          errorMessage={errors.confirm_password.errorMessage}
          required
          mb="4"
        />

        <SubmitButton onClick={handleOnSubmit} className="mb-4" />

        <div className="text-copy-light dark:text-dark-copy-light">
          Have already an account?{" "}
          <Link to="/login" className="text-primary dark:text-primary-light">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
export default SignupPage;
