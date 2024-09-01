import { useState } from "react";
import useUser from "./useUser";
import useUpdateUser from "./useUpdateUser";

function UpdateUserDataForm() {
  const {
    user: { email="", fullName: currentFullName="" },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const { updateUser, isUpdating } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission
    const formData = new FormData();
    formData.append("fullName", fullName);
    if (avatar) {
      console.log(avatar, email);
      formData.append("avatar", avatar);
    }
    updateUser(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-grey-0 px-5 py-8 text-grey-400">
      <div className="flex items-center">
        <label
          htmlFor="email"
          className="mb-2 text-base font-medium  basis-[20%]"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          disabled
          className="p-2 border border-grey-200 rounded-md bg-grey-200  basis-[40%]"
        />
      </div>

      <div className="flex items-center">
        <label
          htmlFor="fullName"
          className="mb-2 text-base font-medium basis-[20%]"
        >
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          className="p-2 border border-grey-200 rounded-md bg-grey-100 focus:outline-none focus:ring-2 focus:ring-blue-500 basis-[40%]"
        />
      </div>

      <div className="flex items-center">
        <label
          htmlFor="avatar"
          className="mb-2 text-base font-medium basis-[20%]"
        >
          Avatar image
        </label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e) => setAvatar(e.target.files[0])}
          className="p-2 outline-none  basis-[40%]"
        />
      </div>

      <div className="flex space-x-4 justify-end">
        <button
          type="reset"
          className="py-2 px-4  text-grey-400 rounded-md border-2 border-grey-400 focus:outline-none focus:ring-1 focus:ring-grey-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update account
        </button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
