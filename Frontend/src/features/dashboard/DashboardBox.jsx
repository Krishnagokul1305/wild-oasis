function DashboardBox({ children, className = "" }) {
  return (
    <div
      className={`bg-grey-100  border border-gray-200 rounded-md p-8 flex flex-col gap-6 ${className}`}
    >
      {children}
    </div>
  );
}

export default DashboardBox