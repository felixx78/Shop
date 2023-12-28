import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { userActions } from "../reducer/userReducer";
import AuthInput from "../components/AuthInput";

function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    email: { isError: false, errorMessage: "" },
    password: { isError: false, errorMessage: "" },
    confirm_password: { isError: false, errorMessage: "" },
  });

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    const confirm_password = formData
      .get("confirm_password")
      ?.toString()
      .trim();

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
      <form
        onSubmit={handleOnSubmit}
        className="mx-auto rounded-md bg-foreground px-6 py-8 sm:w-[400px] dark:bg-dark-foreground"
      >
        <h1 className="mb-2 text-center text-2xl font-bold">Sign Up</h1>

        <AuthInput
          label="Email"
          name="email"
          type="email"
          isError={errors.email.isError}
          errorMessage={errors.email.errorMessage}
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
          isError={errors.password.isError}
          errorMessage={errors.password.errorMessage}
        />

        <AuthInput
          label="Confirm Password"
          name="confirm_password"
          type="password"
          isError={errors.confirm_password.isError}
          errorMessage={errors.confirm_password.errorMessage}
          mb="4"
        />

        <button
          type="submit"
          className="mb-4 block w-full bg-primary py-2 text-dark-copy hover:bg-primary-dark"
        >
          Sign up
        </button>

        <div className="text-copy-light dark:text-dark-copy-light">
          Have already an account?{" "}
          <Link to="/login" className="text-primary dark:text-primary-light">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
export default SignupPage;
