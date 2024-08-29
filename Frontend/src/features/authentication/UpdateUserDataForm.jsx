import { useState } from "react";
import { useUser } from "./useUser";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  // const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          disabled
          className="p-2 border border-gray-300 rounded-md bg-gray-100"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="fullName" className="mb-2 text-sm font-medium text-gray-700">
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="avatar" className="mb-2 text-sm font-medium text-gray-700">
          Avatar image
        </label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          // onChange={(e) => setAvatar(e.target.files[0])}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex space-x-4">
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
          Update account
        </button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
