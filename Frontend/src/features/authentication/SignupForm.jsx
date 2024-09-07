import { useForm } from "react-hook-form";
import useCreateUser from "./useCreateUser";
import SpinnerMini from "../../ui/SpinnerMini";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createUser, creating } = useCreateUser(reset);

  function onSubmit(data) {
    createUser({ ...data, role: "employee" });
  }

  function onError() {
    
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="space-y-7 text-base bg-grey-0 p-5 text-grey-600"
    >
      <div className="flex flex-col">
        <label
          htmlFor="fullName"
          className="mb-2 text-base font-medium text-grey-400"
        >
          Full name
        </label>
        <div className="flex items-center gap-5">
          <input
            type="text"
            id="fullName"
            {...register("fullName", { required: "this field is required" })}
            className="p-2 border border-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 basis-[50%] bg-grey-100"
          />
          {errors?.fullName?.message && (
            <p className="text-sm text-red-700 mt-2 ">
              {errors.fullName.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="mb-2 text-base font-medium text-grey-400"
        >
          Email address
        </label>
        <div className="flex items-center gap-5">
          <input
            type="email"
            id="email"
            {...register("email", { required: "this field is required" })}
            className="p-2 border border-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 basis-[50%] bg-grey-100"
          />
          {errors?.email?.message && (
            <p className="text-sm text-red-700 mt-2 ">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="mb-2 text-base font-medium text-grey-400"
        >
          Password (min 8 characters)
        </label>
        <div className="flex items-center gap-5">
          <input
            type="password"
            {...register("password", {
              required: "this field is required",
              minLength: 8,
            })}
            id="password"
            className="p-2 border border-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 basis-[50%] bg-grey-100"
          />
          {errors?.password?.message && (
            <p className="text-sm text-red-700 mt-2 ">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="passwordConfirm"
          className="mb-2 text-base font-medium text-grey-400"
        >
          Repeat password
        </label>
        <div className="flex items-center gap-5">
          <input
            type="password"
            {...register("confirmPassword", {
              required: "this field is required",
            })}
            id="passwordConfirm"
            className="p-2 border border-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 basis-[50%] bg-grey-100"
          />
          {errors?.confirmPassword?.message && (
            <p className="text-sm text-red-700 mt-2 ">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex space-x-4 justify-end">
        <button
          type="reset"
          className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {creating ? <SpinnerMini /> : "Create new user"}
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
