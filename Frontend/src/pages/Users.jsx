import SignupForm from "../features/authentication/SignupForm";

function Users() {
  return (
    <div className="space-y-5">
      <h1 className="font-bold text-grey-500">Create a new user</h1>
      <SignupForm />
    </div>
  );
}

export default Users;
