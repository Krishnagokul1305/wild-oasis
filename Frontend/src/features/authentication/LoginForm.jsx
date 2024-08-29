import { useState } from "react";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";
import useLogin from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("12345678");

  let { loginFn, logging } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("please provide email and password");
      return;
    }
    loginFn({ email, password });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full px-5 py-6 text-sm"
    >
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        >
          {logging ? <SpinnerMini /> : "Login"}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
