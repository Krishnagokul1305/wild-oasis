import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function Account() {
  return (
    <>
      <h1 className="font-bold text-grey-600">Update your account</h1>
      <div className="space-y-5 mt-5 text-grey-500">
        <div className="text-base space-y-3">
          <h3 className="text-lg font-semibold"> Update user data</h3>
          <UpdateUserDataForm />
        </div>

        <div className="text-base space-y-3">
          <h3 className="text-lg font-semibold">Update password</h3>
          <UpdatePasswordForm />
        </div>
      </div>
    </>
  );
}

export default Account;
