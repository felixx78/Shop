import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { userActions } from "../reducer/userReducer";

function LoginPage() {
  const dispatch = useDispatch();

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    axios
      .post("/api/auth/login", { email, password })
      .then((res) => res.data)
      .then((data) => {
        localStorage.setItem("accessToken", data.accessToken);
        dispatch(userActions.auth(data.payload));
      });
  };

  return (
    <div className="flex min-h-[70vh] flex-col justify-center px-2 pt-6">
      <form
        onSubmit={handleOnSubmit}
        className="mx-auto max-w-[400px] rounded-md bg-foreground px-4 py-8 dark:bg-dark-foreground"
      >
        <h1 className="mb-2 text-center text-2xl font-bold">Login</h1>

        <label htmlFor="login" className="mb-1 block">
          Email
        </label>
        <input
          name="email"
          className="mb-4 w-full border-2 border-border p-2 outline-none hover:border-primary focus:border-primary dark:border-dark-border dark:text-copy"
          type="email"
        />

        <label htmlFor="password" className="mb-1 block">
          Password
        </label>
        <input
          name="password"
          className="mb-2 w-full border-2 border-border p-2 outline-none hover:border-primary focus:border-primary dark:border-dark-border dark:text-copy"
          type="password"
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
