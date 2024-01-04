import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { userActions } from "../reducer/userReducer";
import AuthInput from "../components/AuthInput";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    email: { isError: false, errorMessage: "" },
    password: { isError: false, errorMessage: "" },
  });

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

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
      return;
    }

    axios
      .post("/api/auth/login", { email, password })
      .then((res) => res.data)
      .then((data) => {
        localStorage.setItem("accessToken", data.accessToken);
        dispatch(userActions.auth(data.payload));

        navigate("/");
      })
      .catch((e) => {
        if (e.response.data === "Incorrect password") {
          setErrors((prev) => ({
            ...prev,
            password: {
              errorMessage: "Incorrect password",
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
    <div className="flex min-h-[70vh] flex-col justify-center px-2 pt-6">
      <form
        onSubmit={handleOnSubmit}
        className="mx-auto max-w-[400px] rounded-md bg-foreground px-4 py-8 dark:bg-dark-foreground"
      >
        <h1 className="mb-2 text-center text-2xl font-bold">Login</h1>

        <AuthInput
          label="Email"
          name="email"
          type="email"
          isError={errors.email.isError}
          required
          errorMessage={errors.email.errorMessage}
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
          isError={errors.password.isError}
          required
          errorMessage={errors.password.errorMessage}
        />
        <Link
          to="/"
          className="mb-4 inline-block text-primary-light dark:text-primary"
        >
          Forgot Password?
        </Link>

        <button
          type="submit"
          className="mb-4 block w-full bg-primary py-2 text-dark-copy hover:bg-primary-dark"
        >
          Login
        </button>

        <div className="text-copy-light dark:text-dark-copy-light">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary dark:text-primary-light">
            Create a new account
          </Link>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
