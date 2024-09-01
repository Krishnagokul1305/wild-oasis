import { USER_IMG } from "../../../config/config";
import { defaultUser } from "../../assets/img/index";
import { getUserData } from "../../services/apiUsers";

function UserAvatar({ userName = "DefaultUser" }) {
  const user = getUserData();
  console.log(user);
  return (
    <div className="flex gap-3 items-center font-medium text-gray-500 text-lg">
      <img
        src={`${USER_IMG}/${user?.avatar}` || defaultUser}
        alt={user?.fullName || userName}
        className="block h-[36px] w-[36px] object-cover object-center rounded-full  bg-grey-100"
      />
      <span>{userName}</span>
    </div>
  );
}

export default UserAvatar;
