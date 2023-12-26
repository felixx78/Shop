import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <div className="flex flex-col justify-center px-2 pt-6 md:min-h-[70vh]">
      <form className="bg-foreground dark:bg-dark-foreground mx-auto rounded-md px-6 py-8 sm:w-[400px]">
        <h1 className="mb-2 text-center text-2xl font-bold">Sign Up</h1>

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
          className="border-border dark:text-copy dark:border-dark-border focus:border-primary hover:border-primary mb-4 w-full border-2 p-2 outline-none"
          type="password"
        />

        <label htmlFor="password" className="mb-1 block">
          Confirm Password
        </label>
        <input
          name="password_confirm"
          className="border-border dark:text-copy dark:border-dark-border focus:border-primary hover:border-primary mb-6 w-full border-2 p-2 outline-none"
          type="password"
        />

        <button
          type="submit"
          className="bg-primary text-dark-copy hover:bg-primary-dark mb-4 block w-full py-2"
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
