import { useForm } from "react-hook-form";
import useUpdatePassword from "./useUpdateUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdatePassword();

  function onSubmit(data) {
    updateUser(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-grey-0 px-5 py-8 text-grey-400"
    >
      <div className="flex items-center ">
        <label
          htmlFor="password"
          className="mb-2 text-base font-medium  basis-[25%]"
        >
          Password (min 8 characters)
        </label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          // disabled={isUpdating}
          {...register("newPassword", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
          className={`p-2 border ${
            errors?.password
              ? "border-red-500 focus:ring-red-500"
              : "border-grey-200 focus:ring-blue-500"
          } rounded-md focus:outline-none focus:ring-2  basis-[40%] bg-grey-100`}
        />
        {errors?.password && (
          <p className="mt-1 ms-3 text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <label
          htmlFor="passwordConfirm"
          className="mb-2 text-base font-medium basis-[25%]"
        >
          Confirm password
        </label>
        <input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) =>
              getValues().newPassword === value || "Passwords need to match",
          })}
          className={`p-2 border ${
            errors?.confirmPassword
              ? "border-red-500 focus:ring-red-500"
              : "border-grey-200 focus:ring-blue-500"
          } rounded-md focus:outline-none focus:ring-2  basis-[40%] bg-grey-100`}
        />
        {errors?.confirmPassword && (
          <p className="mt-1 ms-3 text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="flex space-x-4 justify-end">
        <button
          onClick={reset}
          type="reset"
          disabled={isUpdating}
          className="py-2 px-4 border-2 border-grey-400 text-grey-400 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update password
        </button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
