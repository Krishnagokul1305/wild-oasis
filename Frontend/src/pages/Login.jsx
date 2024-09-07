import { logoDark } from "../assets/img";
import LoginForm from "../features/authentication/LoginForm";

function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-grey-50">
      <div className="min-w-[30rem] shadow-lg rounded-lg bg-grey-0 px-5 py-8 space-y-5">
        <div className="w-[120px] mx-auto">
          <img src={logoDark} alt="" className="object-contain"/>
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
