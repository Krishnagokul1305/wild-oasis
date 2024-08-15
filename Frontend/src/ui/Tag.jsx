function Tag({ type, children }) {

  const colorClasses = {
    blue: "text-blue-700 bg-blue-100",
    green: "text-green-700 bg-green-100",
    silver: "text-gray-700 bg-gray-100",
  };

  return (
    <span
      className={`uppercase text-xs font-semibold py-1 px-3 rounded-full ${
        colorClasses[type] || ""
      }`}
    >
      {children}
    </span>
  );
}

export default Tag;