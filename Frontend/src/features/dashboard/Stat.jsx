const Stat = ({ icon, title, value, color }) => {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-md p-4 grid grid-cols-[6.4rem_1fr] grid-rows-[auto_auto] gap-x-4 gap-y-1">
      <div
        className={`flex items-center justify-center rounded-full aspect-square bg-${color}-100 row-span-2`}
      >
        <div className={`w-8 h-8 text-${color}-700`}>{icon}</div>
      </div>
      <h5 className="self-end text-xs font-semibold uppercase tracking-[0.4px] text-gray-500">
        {title}
      </h5>
      <p className="text-2xl font-medium leading-none">{value}</p>
    </div>
  );
};

export default Stat;
