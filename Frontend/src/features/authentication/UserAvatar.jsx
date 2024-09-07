import { USER_IMG } from "../../../config/config";
import { defaultUser } from "../../assets/img/index";
import { getUserData } from "../../services/apiUsers";

function UserAvatar({ userName = "User" }) {
  const user = getUserData();
  console.log(user);
  return (
    <div className="flex gap-3 items-center font-medium text-gray-500 text-lg">
      <img
        src={user?.avatar ? `${USER_IMG}/${user.avatar}` : defaultUser}
        alt={user?.fullName ? user?.fullName : userName}
        className="block h-[36px] w-[36px] object-cover object-center rounded-full  bg-grey-100"
      />
      <span className="capitalize">
        {user?.fullName ? user?.fullName : userName}
      </span>
    </div>
  );
}

export default UserAvatar;
