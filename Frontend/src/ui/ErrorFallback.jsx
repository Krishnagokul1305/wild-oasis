const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <main className="h-screen bg-gray-50 flex items-center justify-center p-12">
      <Box err={error} resetErrorBoundary={resetErrorBoundary} />
    </main>
  );
};

const Box = ({ err, resetErrorBoundary }) => {
  return (
    <div className=" flex-1 max-w-6xl text-center">
      <h1 className="mb-4 font-bold">Error Occurred 🥲</h1>
      <p className="font-sono mb-8 text-gray-500 text-base">
        {err.message} 
      </p>
      <span onClick={resetErrorBoundary} className="cursor-pointer text-sm text-blue-700">
       &larr; Go to Home Page
      </span>
    </div>
  );
};

export default ErrorFallback;
