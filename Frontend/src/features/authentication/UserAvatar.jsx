function UserAvatar({ avatarUrl, userName }) {
  return (
    <div className="flex gap-4 items-center font-medium text-gray-600 text-lg">
      <img
        src={avatarUrl}
        alt={userName}
        className="block w-16 h-16 object-cover object-center rounded-full outline outline-2 outline-gray-100"
      />
      <span>{userName}</span>
    </div>
  );
}

export default UserAvatar;
