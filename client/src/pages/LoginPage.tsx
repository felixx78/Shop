import { Link } from "react-router-dom";

function AuthPage() {
  return (
    <div className="flex min-h-[70vh] flex-col justify-center px-2 pt-6">
      <form className="bg-foreground dark:bg-dark-foreground mx-auto max-w-[400px] rounded-md px-4 py-8">
        <h1 className="mb-2 text-center text-2xl font-bold">Login</h1>

        <label htmlFor="login" className="mb-1 block">
          Email
        </label>
        <input
          name="email"
          className="border-border dark:text-copy dark:border-dark-border focus:border-primary hover:border-primary mb-4 w-full border-2 p-2 outline-none"
          type="email"
        />

        <label htmlFor="password" className="mb-1 block">
          Password
        </label>
        <input
          name="password"
          className="border-border dark:text-copy dark:border-dark-border focus:border-primary hover:border-primary mb-2 w-full border-2 p-2 outline-none"
          type="password"
        />
        <Link
          to="/"
          className="text-primary-light dark:text-primary mb-4 inline-block"
        >
          Forgot Password?
        </Link>

        <button
          type="submit"
          className="bg-primary text-dark-copy hover:bg-primary-dark mb-4 block w-full py-2"
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
export default AuthPage;
